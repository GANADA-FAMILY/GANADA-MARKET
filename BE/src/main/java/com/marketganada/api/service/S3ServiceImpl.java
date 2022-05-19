package com.marketganada.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service("S3Service")
public class S3ServiceImpl implements S3Service {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public List<String> uploadFileList(List<MultipartFile> multipartFiles) {
        List<String> fileNameList = new ArrayList<>();

        multipartFiles.forEach(file -> {
            String fileName = createFileName();
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try(InputStream inputStream = file.getInputStream()) {
//                System.out.println(bucket);
//                System.out.println(fileName+" "+file.getOriginalFilename()+" 2 "+file.getContentType()+" 2 "+file.getSize());
//                System.out.println(objectMetadata.getContentType()+" 1 "+objectMetadata.getContentLength());
                amazonS3Client.putObject(new PutObjectRequest(bucket,fileName,inputStream,objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "upload failed");
            }

            fileNameList.add(amazonS3Client.getUrl(bucket, fileName).toString());
        });

        return fileNameList;
    }

    private String createFileName() {
        return UUID.randomUUID().toString();
    }

    public String deleteFile(String fileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket,fileName));

        return "success";
    }
}
