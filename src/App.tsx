import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import CustomSwitch from "./CustomSwitch";
import { onFullScreen } from "./musinsaFunctions";

export default function App() {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isQrAdFalse, setIsQrAdFalse] = useState(true);

  // set state from storage if have one
  useEffect(() => {
    chrome.storage.sync.get(["isFullScreen", "isQrAdFalse"], (result) => {
      if (result.isFullScreen === undefined || result.isFullScreen === true) {
        chrome.storage.sync.set({ isFullScreen: true });
        onFullScreen(true);
      } else {
        setIsFullScreen(false);
      }

      if (result.isQrAdFalse === undefined) {
        chrome.storage.sync.set({ isQrAdFalse: true });
      } else {
        setIsQrAdFalse(Boolean(result.isQrAdFalse));
      }
    });
  }, []);

  return (
    <Container>
      <Title>Musinsa FullScreen</Title>
      <Content>
        <Text>전체화면 토글</Text>
        <CustomSwitch
          isToggle={isFullScreen}
          onChangeCallback={(e: boolean) => {
            setIsFullScreen(e);
            onFullScreen(e);
            chrome.storage.sync.set({ isFullScreen: e });
          }}
        />
      </Content>
      <Content>
        <Text>QR 광고 끄기</Text>
        <CustomSwitch
          isToggle={isQrAdFalse}
          onChangeCallback={(e: boolean) => {
            setIsQrAdFalse(e);
            const popupElement = document.getElementById(
              "gtm-impression-popup"
            );
            if (popupElement) {
              popupElement.style.display = "none";
            }
            chrome.storage.sync.set({ isQrAdFalse: e });
          }}
        />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.2rem 0.4rem;
  width: 15rem;
`;

const Content = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0.1rem 0;
`;

const Text = styled.div`
  font-size: 0.8rem;
  text-align: center;
  margin: 0.1rem 0;
`;
