package com.marketganada.common;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

import java.util.Properties;

public class SSHConnection {
    private final static String HOST = "ganada.cvdtnlvc0pv1.ap-northeast-2.rds.amazonaws.com";
    private final static Integer PORT = 3306;
    private final static String SSH_USER = "ubuntu";
    private final static String SSH_PW = "ssafy";

    private Session session;

    public void closeSSH(){
        session.disconnect();
    }

    public SSHConnection(){
        try{
            Properties config = new Properties();
            config.put("StrictHostKeyChecking","no");
            JSch jsch = new JSch();
            session = jsch.getSession(SSH_USER,HOST, PORT);
            session.setConfig(config);
            session.setPassword(SSH_PW);
            session.connect();
            session.setPortForwardingL(3306,"127.0.0.1",3306);
            System.out.println("연결성공");

        }catch (JSchException e){
            e.printStackTrace();
        }
    }

}
