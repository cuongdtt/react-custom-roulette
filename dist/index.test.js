import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { act } from '@testing-library/react';
import { Wheel } from '.';
// test('renders Wheel component', () => {
var data = [{ option: '0' }];
var prizeNumber = 0;
var mustStartSpinning = false;
var backgroundColors = ['#3e3e3e', '#df3428'];
var textColors = ['white'];
var outerBorderColor = '#d8a35a';
var outerBorderWidth = 8;
var innerBorderColor = '#d8a35a';
var innerBorderWidth = 17;
var innerRadius = 40;
var radiusLineColor = '#dddddd';
var radiusLineWidth = 3;
var fontSize = 20;
var textDistance = 86;
var onStopSpinning = function () { return null; };
jest.useFakeTimers();
var container;
var root;
beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
});
afterEach(function () {
    root.unmount();
    document.body.removeChild(container);
});
describe('Render Wheel', function () {
    it('required props only', function () {
        root.render(_jsx(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning }));
    });
    it('innerBorderWidth = 0', function () {
        root.render(_jsx(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, innerBorderWidth: 0 }));
    });
    it('outerBorderWidth = 0', function () {
        root.render(_jsx(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, outerBorderWidth: 0 }));
    });
    it('radiusLineWidth = 0', function () {
        root.render(_jsx(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, radiusLineWidth: 0 }));
    });
    it('all props defined', function () {
        root.render(_jsx(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: mustStartSpinning, backgroundColors: backgroundColors, textColors: textColors, fontSize: fontSize, outerBorderColor: outerBorderColor, outerBorderWidth: outerBorderWidth, innerRadius: innerRadius, innerBorderColor: innerBorderColor, innerBorderWidth: innerBorderWidth, radiusLineColor: radiusLineColor, radiusLineWidth: radiusLineWidth, perpendicularText: true, textDistance: textDistance, onStopSpinning: onStopSpinning }));
    });
    it('render spin', function () {
        act(function () {
            root.render(_jsx(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: true }));
            jest.runOnlyPendingTimers();
        });
    });
    it('render callback trigger', function () {
        var hasBeenCalled = false;
        act(function () {
            root.render(_jsx(Wheel, { data: data, prizeNumber: prizeNumber, mustStartSpinning: true, onStopSpinning: function () {
                    hasBeenCalled = true;
                    return null;
                } }));
            expect(hasBeenCalled).not.toBe(true);
        });
        act(function () {
            jest.runAllTimers();
        });
        expect(hasBeenCalled).toBe(true);
    });
});
