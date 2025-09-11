import { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Target } from 'lucide-react';

// Componente para desenhar o ângulo
const AngleDisplay = ({ angle, showAngle = false }: any) => {
    const radius = 80;
    const centerX = 150;
    const centerY = 150;
  
  // Converter ângulo para radianos
    const angleRad = (angle * Math.PI) / 180;
  
  // Coordenadas do final da linha do ângulo
    const lineEndX = centerX + radius * Math.cos(angleRad);
    const lineEndY = centerY - radius * Math.sin(angleRad);
  
  // Caminho do arco
    const largeArcFlag = angle > 180 ? 1 : 0;
    const arcPath = `M ${centerX + radius} ${centerY} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${lineEndX} ${lineEndY}`;
  
    return (
        <div className="relative">
            <svg width="300" height="300" className="border-2 border-gray-200 rounded-lg bg-white">
        
                {/* Linha do ângulo */}
                <line
                    x1={centerX}
                    y1={centerY}
                    x2={lineEndX}
                    y2={lineEndY}
                    stroke="#1f2937"
                    strokeWidth="3"
                />
        
                {/* Linha de referência (horizontal) */}
                <line
                    x1={centerX}
                    y1={centerY}
                    x2={centerX + radius}
                    y2={centerY}
                    stroke="#1f2937"
                    strokeWidth="3"
                />
        
                {/* Arco vermelho mostrando o ângulo */}
                <path
                    d={arcPath}
                    fill="none"
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
                        {angle}°
                    </text>
                )}
            </svg>
        </div>
    );
};

// Componente principal da página
const AnglePage = () => {
    const [targetAngle, setTargetAngle] = useState(0);
    const [guesses, setGuesses] = useState<any>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState('playing');
    const [score, setScore] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);

    // Inicializar novo jogo
    const startNewGame = () => {
        const newAngle = Math.floor(Math.random() * 360);
        setTargetAngle(newAngle);
        setGuesses([]);
        setCurrentGuess('');
        setGameStatus('playing');
    };

    // Inicializar primeiro jogo
    useEffect(() => {
        startNewGame();
    }, []);

    // Fazer uma tentativa
    const makeGuess = () => {
        if (currentGuess === '' || gameStatus !== 'playing') return;
        
        const guessValue = parseInt(currentGuess);
        if (isNaN(guessValue) || guessValue < 0 || guessValue >= 360) {
            alert('Por favor, digite um ângulo válido entre 0 e 359 graus');
            return;
        }

        const newGuess = {
            value: guessValue,
            difference: Math.abs(guessValue - targetAngle),
            direction: guessValue > targetAngle ? 'menor' : guessValue < targetAngle ? 'maior' : 'correto'
        };

        const newGuesses = [...guesses, newGuess];
        setGuesses(newGuesses);
        setCurrentGuess('');

        // Verificar se ganhou
        if (guessValue === targetAngle) {
            setGameStatus('won');
            setScore(score + (4 - newGuesses.length) * 10); // Mais pontos para menos tentativas
            setGamesPlayed(gamesPlayed + 1);
        } else if (newGuesses.length >= 3) {
            setGameStatus('lost');
            setGamesPlayed(gamesPlayed + 1);
        }
    };

  // Próximo jogo
    const nextGame = () => {
        startNewGame();
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            makeGuess();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Target className="w-8 h-8 text-red-500" />
                            <h1 className="text-3xl font-bold text-gray-900">Angle.wtf</h1>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                <span>Score: {score}</span>
                            </div>
                            <div>Jogos: {gamesPlayed}</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Lado esquerdo - Visualização do ângulo */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Adivinhe o ângulo em 3 tentativas ou menos!
                            </h2>
                            <p className="text-gray-600">
                                O ângulo está indicado pelo arco vermelho
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <AngleDisplay 
                                angle={targetAngle} 
                                showAngle={gameStatus !== 'playing'} 
                            />
                        </div>
                        {/* Status do jogo */}
                        {gameStatus === 'won' && (
                            <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center">
                                <h3 className="text-green-800 font-semibold text-lg">🎉 Parabéns!</h3>
                                <p className="text-green-700">
                                    Você acertou em {guesses.length} tentativa{guesses.length > 1 ? 's' : ''}!
                                </p>
                                <p className="text-green-700">O ângulo era {targetAngle}°</p>
                            </div>
                        )}
                        {gameStatus === 'lost' && (
                            <div className="bg-red-100 border border-red-400 rounded-lg p-4 text-center">
                                <h3 className="text-red-800 font-semibold text-lg">😔 Que pena!</h3>
                                <p className="text-red-700">Suas tentativas acabaram.</p>
                                <p className="text-red-700">O ângulo era {targetAngle}°</p>
                            </div>
                        )}
                        </div>
                    {/* Lado direito - Controles e histórico */}
                    <div className="space-y-6">
                        {/* Input para tentativa */}
                        {gameStatus === 'playing' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Tentativa {guesses.length + 1} de 3
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={currentGuess}
                                        onChange={(e) => setCurrentGuess(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Digite o ângulo (0-359)"
                                        min="0"
                                        max="359"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={makeGuess}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                                    >
                                        Tentar
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* Histórico de tentativas */}
                        {guesses.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">Suas tentativas:</h3>
                                <div className="space-y-2">
                                    {guesses.map((guess: any, index: any) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <span className="font-medium">{guess.value}°</span>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm px-2 py-1 rounded ${
                                                    guess.difference <= 5 ? 'bg-red-100 text-red-800' : 
                                                    guess.difference <= 15 ? 'bg-yellow-100 text-yellow-800' : 
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {
                                                        guess.difference === 0 ? '🎯 Acertou!' : 
                                                        guess.difference <= 5 ? '🔥 Muito perto!' :
                                                        guess.difference <= 15 ? '🎯 Perto!' :
                                                        `↗️ ${guess.direction.toUpperCase()}`
                                                    }
                                                </span>
                                                {guess.difference > 0 && (
                                                    <span className="text-gray-500 text-sm">
                                                        {guess.value < targetAngle && ("⬆️") || ("⬇️")}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Botões de ação */}
                        <div className="flex gap-3">
                            {gameStatus !== 'playing' && (
                                <button
                                    onClick={nextGame}
                                    className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                >
                                    Próximo Jogo
                                </button>
                            )}
                            <button
                                onClick={startNewGame}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            >
                            <RotateCcw className="w-4 h-4" />
                                Reiniciar
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AnglePage;