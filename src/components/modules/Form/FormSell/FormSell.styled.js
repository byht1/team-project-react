import styled from 'styled-components';

export const FormWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate(-50%, -50%) scale(1);
  transform-origin: top left;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  width: 93.7vw;
  height: 76.5vh;
  overflow-y: auto;
  padding: 40px 20px;
  @media (min-width: 768px) {
    width: 608px;
    min-height: 885;
    padding: 40px 80px;
  }
  /* @media (min-width: 1280px) {
  } */
`;
