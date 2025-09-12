import type { AngleDisplayProps } from "./components/AngleDisplay";

export function generateSingleAngle(angle = Math.floor(Math.random() * 360)) {
    return angle;
}

export function randomAngle(angleA = generateSingleAngle(), angleB = generateSingleAngle(), showAngle = false): AngleDisplayProps {
    return { startAngle: angleA, endAngle: angleB, showAngle: showAngle };
}