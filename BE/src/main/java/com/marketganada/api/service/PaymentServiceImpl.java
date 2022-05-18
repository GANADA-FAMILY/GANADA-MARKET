package com.marketganada.api.service;

import com.marketganada.api.request.KakaoPaySuccessRequest;
import com.marketganada.api.request.PaymentInsertRequest;
import com.marketganada.api.request.TrackingNumUpdateRequest;
import com.marketganada.common.KakaoPayApprovalVO;
import com.marketganada.common.KakaoPayReadyVO;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Payment;
import com.marketganada.db.entity.ProductHistory;
import com.marketganada.db.entity.User;
import com.marketganada.db.repository.AuctionRepository;
import com.marketganada.db.repository.PaymentRepository;
import com.marketganada.db.repository.ProductHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    AuctionRepository auctionRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    ProductHistoryRepository productHistoryRepository;

    private static final String HOST = "https://kapi.kakao.com";

    @Override
    @Transactional
    public String insertPayment(PaymentInsertRequest paymentInsertRequest, User user) {
        String res = "";
        Optional<Auction> auction = auctionRepository.findById(paymentInsertRequest.getAuctionId());

        if(auction.isPresent()){
            Date curDate = new Date(); //현재 날짜
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            simpleDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Seoul"));

            try {
                curDate =  simpleDateFormat.parse(simpleDateFormat.format(curDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }

            System.out.println("현재시간"+curDate);
            Date endTime = auction.get().getEndTime();
            try {
                endTime = simpleDateFormat.parse(simpleDateFormat.format(endTime));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            System.out.println("종료시간"+endTime);

            //시간이 지나버린 경매
            if(endTime.before(curDate)){
                System.out.println("타임오버");
                auction.get().setAuctionStatus(false);
                auctionRepository.save(auction.get());
                return "fail";
            }
            //결제가 진행중인 경매
            Optional<Payment> checkPayment = paymentRepository.findByUserAndAuction(user, auction.get());
            if(checkPayment.isPresent()){
                System.out.println("중복");
                return "conflict";
            }
            Payment payment = Payment.builder()
                    .price(paymentInsertRequest.getPrice())
                    .status(0)
                    .paymentMethod(paymentInsertRequest.getPaymentMethod())
                    .buyerName(paymentInsertRequest.getBuyerName())
                    .phone(paymentInsertRequest.getPhone())
                    .postalCode(paymentInsertRequest.getPostalCode())
                    .address(paymentInsertRequest.getAddress())
                    .addressDetail(paymentInsertRequest.getAddressDetail())
                    .user(user)
                    .auction(auction.get())
                    .build();
            paymentRepository.save(payment);
            res = String.valueOf(payment.getPaymentId());
            auction.get().setAuctionStatus(false);
            auctionRepository.save(auction.get());
        }else{
            System.out.println("없는경매");
            return "fail";
        }
        return res;
    }

    @Override
    public KakaoPayReadyVO kakaoPayReady(PaymentInsertRequest paymentInsertRequest, User user) {

        Auction auction = auctionRepository.findById(paymentInsertRequest.getAuctionId()).get();
        Payment payment = paymentRepository.findByAuction(auction).get();

        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + "447d508a67ae67ec1eb15cf2843b7402");
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("partner_order_id", String.valueOf(payment.getPaymentId()));
        params.add("partner_user_id", user.getUserEmail());
        params.add("item_name", payment.getAuction().getProduct().getProductName());
        params.add("quantity", "1");
        params.add("total_amount", String.valueOf(paymentInsertRequest.getPrice()));
        params.add("tax_free_amount", "0");
        params.add("approval_url", "http://localhost:3000/payment/result/approve");
        params.add("cancel_url", "http://localhost:3000/payment/result/cancel");
        params.add("fail_url", "http://localhost:3000/payment/result/fail");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            KakaoPayReadyVO kakaoPayReadyVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyVO.class);
            System.out.println(kakaoPayReadyVO.getNext_redirect_pc_url());
            System.out.println(kakaoPayReadyVO.getTid());
            System.out.println(payment.getPaymentId());

            return kakaoPayReadyVO;

        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public KakaoPayApprovalVO kakaoPayInfo(KakaoPaySuccessRequest kakaoPaySuccessRequest, User user) {
        RestTemplate restTemplate = new RestTemplate();

        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + "447d508a67ae67ec1eb15cf2843b7402");
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");

        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("tid", kakaoPaySuccessRequest.getTId());
        params.add("partner_order_id", kakaoPaySuccessRequest.getOrderId());
        params.add("partner_user_id", user.getUserEmail());
        params.add("pg_token", kakaoPaySuccessRequest.getPgToken());

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            KakaoPayApprovalVO kakaoPayApprovalVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApprovalVO.class);

            return kakaoPayApprovalVO;

        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void successPayment(Long paymentId) {
        Optional<Payment> payment = paymentRepository.findById(paymentId);
        if(payment.isPresent() && payment.get().getStatus()==0){
            payment.get().setStatus(1);
            paymentRepository.save(payment.get());
        }
    }

    @Override
    public String updateTrackingNum(Long paymentId, TrackingNumUpdateRequest request, User user) {

        Optional<Payment> payment = paymentRepository.findById(paymentId);
        //존재하지 않는다면
        if(!payment.isPresent()){
            System.out.println("존재하지 않음");
            return "fail";
        }
        //입금완료거나 운송장번호 입력 상태라면
        if(payment.get().getStatus()==1 || payment.get().getStatus()==2){
            //판매자인 경우에만
            if(payment.get().getAuction().getUser().getUserId().equals(user.getUserId())){
                payment.get().setStatus(2);
                payment.get().setCourier(request.getCourier());
                payment.get().setTrackingNum(request.getTrackingNum());
                paymentRepository.save(payment.get());
                return "success";
            }else{
                System.out.println("판매자가 아님");
                return "Unauthorized";
            }
        }
        return "fail";
    }

    @Override
    @Transactional
    public String confirmPayment(Long paymentId, User user) {
        Optional<Payment> payment = paymentRepository.findById(paymentId);
        //존재하지 않는다면
        if(!payment.isPresent()){
            System.out.println("존재하지 않음");
            return "fail";
        }
        //운송장번호 입력 상태라면
        if(payment.get().getStatus()==2){
            //구매자인 경우에만
            if(payment.get().getUser().getUserId().equals(user.getUserId())){
                payment.get().setStatus(3);
                paymentRepository.save(payment.get());
                //상품 거래 기록 생성
                ProductHistory productHistory = ProductHistory.builder()
                        .historyDate(payment.get().getTradeDate())
                        .historyPrice(payment.get().getPrice())
                        .product(payment.get().getAuction().getProduct())
                        .build();
                productHistoryRepository.save(productHistory);
                return "success";
            }else{
                System.out.println("구매자가 아님");
                return "Unauthorized";
            }
        }
        return "fail";
    }

    @Override
    public List<Payment> getOrderHistory(User user) {
        List<Payment> orderHistory = paymentRepository.findByUser(user);
        return orderHistory;
    }

    @Override
    public List<Payment> getSalesHistory(User user) {
        List<Payment> salesHistory = paymentRepository.selectSalesHistory(user.getUserId());

        return salesHistory;
    }


}
