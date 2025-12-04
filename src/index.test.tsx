// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from '@testing-library/react';

import { Wheel } from '.';

// test('renders Wheel component', () => {
const data = [{ option: '0' }];
const prizeNumber = 0;
const mustStartSpinning = false;

const backgroundColors = ['#3e3e3e', '#df3428'];
const textColors = ['white'];
const outerBorderColor = '#d8a35a';
const outerBorderWidth = 8;
const innerBorderColor = '#d8a35a';
const innerBorderWidth = 17;
const innerRadius = 40;
const radiusLineColor = '#dddddd';
const radiusLineWidth = 3;
const fontSize = 20;
const textDistance = 86;
const onStopSpinning = () => null;

jest.useFakeTimers();

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  root.unmount();
  document.body.removeChild(container);
});

describe('Render Wheel', () => {
  it('required props only', () => {
    root.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
      />
    );
  });

  it('innerBorderWidth = 0', () => {
    root.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        innerBorderWidth={0}
      />
    );
  });

  it('outerBorderWidth = 0', () => {
    root.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        outerBorderWidth={0}
      />
    );
  });

  it('radiusLineWidth = 0', () => {
    root.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        radiusLineWidth={0}
      />
    );
  });

  it('all props defined', () => {
    root.render(
      <Wheel
        data={data}
        prizeNumber={prizeNumber}
        mustStartSpinning={mustStartSpinning}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontSize={fontSize}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        perpendicularText
        textDistance={textDistance}
        onStopSpinning={onStopSpinning}
      />
    );
  });

  it('render spin', () => {
    act(() => {
      root.render(
        <Wheel data={data} prizeNumber={prizeNumber} mustStartSpinning />
      );
      jest.runOnlyPendingTimers();
    });
  });

  it('render callback trigger', () => {
    let hasBeenCalled = false;

    act(() => {
      root.render(
        <Wheel
          data={data}
          prizeNumber={prizeNumber}
          mustStartSpinning
          onStopSpinning={() => {
            hasBeenCalled = true;
            return null;
          }}
        />
      );

      expect(hasBeenCalled).not.toBe(true);
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(hasBeenCalled).toBe(true);
  });
});
