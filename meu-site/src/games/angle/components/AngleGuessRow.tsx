interface AngleGuessRowProps {
    guess: number;
    targetAngle: number;
}

function AngleGuessRow({ guess, targetAngle }: AngleGuessRowProps) {
    const difference = targetAngle - guess
    const direction = difference > 0 ? "⬆️" : difference < 0 ? "⬇️" : '';
    const absDifference = Math.abs(difference);

    return (
        <div>
            {guess}°
            {absDifference === 0 && (" Acertou 🎉")
            || absDifference  <= 5 && (" Muito perto 🔥")
            || absDifference <= 10 && (" Perto!")
            || absDifference <= 20 && (" Um pouco longe...")
            || (" Longe ❄️")}
            {direction}
        </div>
    )
}

export default AngleGuessRow;