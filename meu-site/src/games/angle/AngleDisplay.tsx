export interface AngleDisplayProps {
    startAngle: number;
    endAngle: number;
    showAngle:  boolean;
}

const AngleDisplay = ({ startAngle, endAngle, showAngle }: AngleDisplayProps) => {
    const radius = 80;
    const angleRadius = 25;
    const centerX = 150;
    const centerY = 150;
  
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const startX = centerX + radius * Math.cos(startAngleRad);
    const startY = centerY - radius * Math.sin(startAngleRad);

    const angleStartX = centerX + angleRadius * Math.cos(startAngleRad);
    const angleStartY = centerY - angleRadius * Math.sin(startAngleRad);

    const endX = centerX + radius * Math.cos(endAngleRad);
    const endY = centerY - radius * Math.sin(endAngleRad);

    const angleEndX = centerX + angleRadius * Math.cos(endAngleRad);
    const angleEndY = centerY - angleRadius * Math.sin(endAngleRad);

    let delta = (endAngle - startAngle + 360) % 360;
    const largeArcFlag = delta > 180 ? 1 : 0;

    const arcPath = `M ${angleStartX} ${angleStartY} A ${angleRadius} ${angleRadius} 0 ${largeArcFlag} 0 ${angleEndX} ${angleEndY}`;
  
    return (
        <div className="relative">
            <svg width="300" height="300" className="border-2 border-gray-200 rounded-lg bg-white">

                {/* Arco vermelho mostrando o ângulo */}
                <path
                    d={arcPath}
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="3"
                />
        
                {/* Linha do ângulo */}
                <line
                    x1={centerX}
                    y1={centerY}
                    x2={startX}
                    y2={startY}
                    stroke="#ef4444"
                    strokeWidth="3"
                />
        
                {/* Linha de referência (horizontal) */}
                <line
                    x1={centerX}
                    y1={centerY}
                    x2={endX}
                    y2={endY}
                    stroke="#ef4444"
                    strokeWidth="3"
                />
        
                {/* Ponto central */}
                <circle cx={centerX} cy={centerY} r="4" fill="#1f2937" />
        
                {/* Mostrar o valor do ângulo se solicitado */}
                {showAngle && (
                    <text
                        x={centerX + 30}
                        y={centerY - 30}
                        fontSize="24"
                        fontWeight="bold"
                        fill="#ef4444"
                        textAnchor="middle"
                    >
                        {delta}°
                    </text>
                )}
            </svg>
        </div>
    );
};

export default AngleDisplay;