import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
`;

const appearFromTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${appearFromTop} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const BoxUser = styled.table`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  background: #fff;
  padding: 20px;
  color: #666360;
  border-radius: 10px;
  animation: ${appearFromTop} 1s;

  thead {
    tr {
      text-align: left;
      th {
        padding-bottom: 20px;
      }
    }
  }

  tbody {
    padding-bottom: 10px;
    border-bottom: 1px solid #666360;

    tr {
      td {
        button {
          background: #ff9000;
          border: none;
          padding: 6px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;

          &:hover {
            background: ${shade(0.2, '#ff9000')};
          }
        }
      }
    }
  }
`;
