package com.marketganada.api.service;

import com.marketganada.api.request.KakaoPaySuccessRequest;
import com.marketganada.api.request.PaymentInsertRequest;
import com.marketganada.common.KakaoPayApprovalVO;
import com.marketganada.common.KakaoPayReadyVO;
import com.marketganada.db.entity.Auction;
import com.marketganada.db.entity.Payment;
import com.marketganada.db.entity.User;
import com.marketganada.db.repository.AuctionRepository;
import com.marketganada.db.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Autowired
    AuctionRepository auctionRepository;
    @Autowired
    PaymentRepository paymentRepository;

    private static final String HOST = "https://kapi.kakao.com";

    @Override
    public String insertPayment(PaymentInsertRequest paymentInsertRequest, User user) {
        String res = "";
        Optional<Auction> auction = auctionRepository.findById(paymentInsertRequest.getAuctionId());

        if(auction.isPresent()){
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
        params.add("approval_url", "http://localhost:5500/kakaoPaySuccess.html");
        params.add("cancel_url", "http://localhost:5500/kakaoPayCancel.html");
        params.add("fail_url", "http://localhost:5500/kakaoPaySuccessFail.html");

        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        try {
            KakaoPayReadyVO kakaoPayReadyVO = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPayReadyVO.class);
            System.out.println(kakaoPayReadyVO.getNext_redirect_pc_url());
            System.out.println(kakaoPayReadyVO.getTid());

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
}
