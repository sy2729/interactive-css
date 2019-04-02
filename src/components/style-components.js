import styled from 'styled-components';

const buttonColor = '#242B35';
const hightLightColor = '#42E133';
const hightLightColorShadow = '0px 0px 31px 0px rgba(90,184,95,1)';
const baseTextColor = '#F1F2F2';


// bg
const basicBG = 'rgba(42,51,61,1)';
export const basicLinearBG = 'linear-gradient(45deg, rgba(42,51,61,1) 0%, rgba(66,78,91,1) 100%)';

// shadow
const buttonBoxshadow = `0px 13px 68px -4px rgba(70,70,71,1)`;
const buttonBoxshadow_hover = `0px 13px 82px -4px rgba(70,70,71;,1)`
const boxshadow = '0px 14px 19px -4px rgba(41,41,41,1)';

export const HightLightCircle = styled.div`
  width: 10px;
  height: 10px;
  background: ${hightLightColor};
  border-radius: 50%;
  box-shadow: ${hightLightColorShadow};
`

export const baseButton = (arr, mimWidth, obj)=> {
  let [pt, pr, pb, pl] = arr;
  mimWidth = mimWidth ? mimWidth : 150;
  let {boxShadow} = obj ? obj : {};
  return styled.button`
    border: none;
    font-size: 1em;
    padding: ${pt}px ${pr}px ${pb}px ${pl}px;
    background: ${buttonColor};
    color: ${baseTextColor};
    box-shadow: ${boxShadow ? boxShadow : buttonBoxshadow};
    transition: all .6s;
    cursor: pointer;
    min-width: ${mimWidth}px;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${buttonBoxshadow_hover};
    }
  `
}

export const imgBgContainer = styled.div`
  background: transparent center no-repeat;
  background-size: cover;
  /* background-image: ${props=>props.bg || ''} */
`

export const createMargin = (vertical, horizontal)=> {
  return styled.div`
    margin: ${`${vertical || 20}px ${horizontal || 'auto'}`};
  `
}

export const BgContainer = styled.div`
    background: ${props => props.bgColor || basicLinearBG};
    box-shadow: ${props => props.boxShadow || 'none'};
  `
