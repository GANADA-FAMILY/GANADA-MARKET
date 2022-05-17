package com.marketganada.api.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface S3Service {
    public List<String> uploadFileList(List<MultipartFile> multipartFiles);
    public String deleteFile(String fileName);
}
