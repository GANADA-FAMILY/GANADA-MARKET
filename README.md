# ๐ ๊ฐ๋๋ค ๋ง์ผ

**๊ฐ**๋ํ **๋**๋ **๋ค** ์ด ์ ์๋ **๋ง์ผ**



## ๐ ๋ชฉ์ฐจ

- [์๋น์ค ์๊ฐ](#์๋น์ค-์๊ฐ)
  - [ํ์ ์๊ฐ](#-ํ์-์๊ฐ)
  - [๊ธฐ์  ์คํ](#-๊ธฐ์ -์คํ)
- [ํ๋ก์ ํธ ํด๋ ๊ตฌ์กฐ](#ใ๋ก์ ํธ-ํด๋-๊ตฌ์กฐ)
- [์ฐ์ถ๋ฌผ](#์ฐ์ถ๋ฌผ)
  - [์ํคํ์ฒ](#-์ํคํ์ฒ)
  - [๊ธฐ๋ฅ ๋ช์ธ์](#-๊ธฐ๋ฅ-๋ช์ธ์)
  - [ํ๋ฉด ์ค๊ณ](#-ํ๋ฉด-์ค๊ณ)
  - [์ปจ๋ฒค์](#-์ปจ๋ฒค์)
  - [ERD](#-ERD)

- [๊ฒฐ๊ณผ๋ฌผ](#๊ฒฐ๊ณผ๋ฌผ)



## ๐์๋น์ค ์๊ฐ
**๊ฐ๋๋ค๋ง์ผ์ ๋ฏธ๊ฐ๋ด ์ ์์ ํ๋ง์ ๊ฑฐ๋ํ๊ธฐ ์ํ ํ๋ซํผ์๋๋ค.**

์ฝ๊ณ  ๋น ๋ฅธ ๊ฑฐ๋๋ฅผ ์ํด ํํฅ์ ๊ฒฝ๋งค์์คํ์ ๋์ํ์์ต๋๋ค. ํ๋งค์๋ ํ๋งค ๊ฐ๊ฒฉ์ ์ผ์ผ์ด ์ ๊ฒฝ ์ธ ํ์๊ฐ ์๊ณ , ๊ตฌ๋งค์๋ ํฉ๋ฆฌ์ ์ธ ๊ฐ๊ฒฉ์ ์ ํ์ ๊ตฌ์ํ  ์ ์์ต๋๋ค.

ํํฅ์ ๊ฒฝ๋งค๋ฐฉ์์ ์ค๊ณ  ๋ฐ ๋ฏธ๊ฐ๋ด ์ ์์ ํ ๊ฑฐ๋ ํ๋ซํผ

- โ๊ฐ๋๋ค ๋ง์ผโ ์ ์ด๋ฐ ๋ถ๋ค์ ์ํด ๋ง๋ค์์ด์.
  - ๊ฐ์ง๊ณ  ์์๋ ๋ฌผ๊ฑด์ ๋น ๋ฅด๊ฒ ์ ๋ฆฌํ๊ณ  ์ถ์ผ์  ๋ถ
  - ํํฅ์ ๊ฒฝ๋งค ์์คํ์ผ๋ก ๊ฐ์ธ๊ฒ ๋ฌผ๊ฑด์ ๊ตฌํ๊ณ  ์ถ์ผ์  ๋ถ



## ๐ ๊ฐ๋ฐ๊ธฐ๊ฐ
- 2022.04.11 ~ 2022.05.20 (์ด 6์ฃผ )



## ๐ ํ์ ์๊ฐ

```bash
๐ค ์กฐ์ค์ : ํ์ฅ / Frontend

๐บ ๊น๋ฏผ์ฑ : Frontend / CI/CD

๐ฎ ๊น์ํฌ : Backend

๐ ๊น์์ค : Backend / Tech Leader

๐ ๋ฐ์ฐฝ๊ฑด : Frontend

๐ฅฑ ์ดํ์ค : Frontend / Tech Leader
```



## ๐ป ๊ธฐ์  ์คํ

```
**BackEnd** : Java(Zulu Open JDK 11), SpringBoot(Spring Boot 2.4.5), Gradle(7.4), 
					lombok, swagger(3.0.0), querydsl, jpa, jacoco
**FrontEnd**: React, TypeScript, Redux-toolkit, StoryBook, Emotion, Jest
**CI/CD** : Jenkins, Docker, Nginx, AWS EC2
**Test:** Jest, Storybook, JUnit
```



## ๐ ํด๋ ๊ตฌ์กฐ

- **FE**

```bash
โโapi
โโassets
โโcomponents
โ  โโatoms
โ  โโlayouts
โ  โโmolecules
โ  โโorganisms
โ  โโtemplates
โโconstants
โโfunctions
โโhooks
โโpages
โโstate
โ  โโstore.ts
โ  โโreducers
โโstories
โ  โโassets
โโstyles
โโtypes
    โโEntity
    โโForm
```

- **BE**

```bash
โโgenerated
โโjava
โ  โโcom
โ      โโmarketganada
โ          โโapi
โ          โ  โโcontroller
โ          โ  โโrequest
โ          โ  โโresponse
โ          โ  โโservice
โ          โโcommon
โ          โโconfig
โ          โ  โโauth
โ          โ  โโoauth
โ          โโdb
โ              โโentity
โ              โโrepository
โโresources
```



## ๐ก ์ฐ์ถ๋ฌผ

### ๐ง ์ํคํ์ฒ


![์ํคํ์ณ](./exec/images/Architecture.png)



### ๐ ๊ธฐ๋ฅ ๋ช์ธ์

[Google Sheets - create and edit spreadsheets online, for free.](https://docs.google.com/spreadsheets/d/1W7UeY-xeRbIqElNUw15ps2ImVIPndoqjrQ9TsLd4tao/edit#gid=0)



### ๐ฅ๏ธ ํ๋ฉด ์ค๊ณ
[๊ฐ๋๋ค๋ง์ผ](https://www.figma.com/file/HbfYDebTup8DhdqKKp5AhO/๊ฐ๋๋ค๋ง์ผ?node-id=0%3A1)



### โ ์ปจ๋ฒค์
- [Git ์ปจ๋ฒค์](https://www.notion.so/Git-6e5ca54945f5452e8d5b69e412839fff)
- [ํ๋ก ํธ์๋ ์ฝ๋ ์ปจ๋ฒค์](https://www.notion.so/efbc0d2ce5d64d3084326186dfc04795)
- [๋ฐฑ์๋ ์ฝ๋ ์ปจ๋ฒค์](https://www.notion.so/1aaaa7d5738b465bb8ac8c1ac472060e)
- [Jira ์ปจ๋ฒค์](https://www.notion.so/Jira-b005810c002942e8b4751c52cb909c86)



### ๐ฟ ERD

![ERD](./exec/images/ERD.png)



## ๊ฒฐ๊ณผ๋ฌผ
- [ํฌํ๋ฉ๋ด์ผ](./exec/ํฌํ๋ฉ๋ด์ผ.md)
- [์์ฐ์๋๋ฆฌ์ค](./exec/์์ฐ์๋๋ฆฌ์ค.md)

- [UCC](https://youtu.be/mXXHsJHjoXE)