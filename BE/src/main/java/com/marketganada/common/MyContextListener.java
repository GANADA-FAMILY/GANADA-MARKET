package com.marketganada.common;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

//@WebListener
public class MyContextListener implements ServletContextListener {
    private SSHConnection sshConnection;

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("외앉되");
        try{
            sshConnection = new SSHConnection();
            System.out.println("되라 좀");
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("종료");
        sshConnection.closeSSH();
    }
}
