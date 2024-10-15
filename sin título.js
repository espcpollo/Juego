import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, Music, Moon, Vibrate, Target, Settings } from 'lucide-react';

// Componente DotAndBoxes
const DotAndBoxes = () => {
  const [board, setBoard] = useState(Array(25).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleClick = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
      {board.map((cell, index) => (
        <button
          key={index}
          className="w-12 h-12 bg-blue-200 flex items-center justify-center text-2xl font-bold"
          onClick={() => handleClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

// Componente Mancala
const Mancala = () => {
  const [board, setBoard] = useState([4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const handleMove = (pit) => {
    if (pit < 6 && currentPlayer === 0 || pit > 6 && pit < 13 && currentPlayer === 1) {
      const newBoard = [...board];
      let stones = newBoard[pit];
      newBoard[pit] = 0;
      let currentPit = pit;

      while (stones > 0) {
        currentPit = (currentPit + 1) % 14;
        if (currentPit !== 6 && currentPlayer === 1 || currentPit !== 13 && currentPlayer === 0) {
          newBoard[currentPit]++;
          stones--;
        }
      }

      setBoard(newBoard);
      setCurrentPlayer(1 - currentPlayer);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex mb-4">
        {board.slice(0, 6).map((pit, index) => (
          <button key={index} className="w-12 h-12 bg-green-200 m-1" onClick={() => handleMove(index)}>
            {pit}
          </button>
        ))}
      </div>
      <div className="flex justify-between w-full mb-4">
        <div className="w-12 h-24 bg-green-400 flex items-center justify-center">{board[6]}</div>
        <div className="w-12 h-24 bg-green-400 flex items-center justify-center">{board[13]}</div>
      </div>
      <div className="flex">
        {board.slice(7, 13).reverse().map((pit, index) => (
          <button key={index} className="w-12 h-12 bg-green-200 m-1" onClick={() => handleMove(12 - index)}>
            {pit}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente TwoPlayerGames
const TwoPlayerGames = () => {
  const [game, setGame] = useState('tictactoe');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');

  const handleClick = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const renderTicTacToe = () => (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
      {board.map((cell, index) => (
        <button
          key={index}
          className="w-16 h-16 bg-blue-200 flex items-center justify-center text-2xl font-bold"
          onClick={() => handleClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <select
        className="mb-4 p-2 border rounded"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      >
        <option value="tictactoe">Tic Tac Toe</option>
        <option value="connect4">Connect 4</option>
      </select>
      {game === 'tictactoe' ? renderTicTacToe() : <div>Connect 4 (Por implementar)</div>}
    </div>
  );
};

// Componente FourPlayerGames
const FourPlayerGames = () => {
  const [game, setGame] = useState('uno');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [cards, setCards] = useState([
    ['🔴7', '🔵3', '🟢5', '🟡2'],
    ['🔴4', '🔵8', '🟢1', '🟡6'],
    ['🔴9', '🔵2', '🟢7', '🟡3'],
    ['🔴1', '🔵5', '🟢8', '🟡9'],
  ]);

  const playCard = (playerIndex, cardIndex) => {
    if (playerIndex === currentPlayer) {
      const newCards = [...cards];
      newCards[playerIndex].splice(cardIndex, 1);
      setCards(newCards);
      setCurrentPlayer((currentPlayer + 1) % 4);
    }
  };

  const renderUno = () => (
    <div className="flex flex-col items-center">
      {cards.map((playerCards, playerIndex) => (
        <div key={playerIndex} className="mb-4">
          <div className="font-bold mb-2">Player {playerIndex + 1}{playerIndex === currentPlayer ? " (Current)" : ""}</div>
          <div className="flex">
            {playerCards.map((card, cardIndex) => (
              <button
                key={cardIndex}
                className="w-12 h-16 bg-white border border-gray-300 m-1 flex items-center justify-center text-2xl"
                onClick={() => playCard(playerIndex, cardIndex)}
              >
                {card}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <select
        className="mb-4 p-2 border rounded"
        value={game}
        onChange={(e) => setGame(e.target.value)}
      >
        <option value="uno">Uno</option>
        <option value="monopoly">Monopoly</option>
      </select>
      {game === 'uno' ? renderUno() : <div>Monopoly (Por implementar)</div>}
    </div>
  );
};

// Componente Antistress
const Antistress = () => {
  const [bubbles, setBubbles] = useState([]);

  const addBubble = (e) => {
    const newBubble = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 50 + 10,
    };
    setBubbles([...bubbles, newBubble]);
  };

  const popBubble = (id) => {
    setBubbles(bubbles.filter(bubble => bubble.id !== id));
  };

  return (
    <div className="relative w-full h-64 bg-blue-100" onClick={addBubble}>
      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-blue-300 cursor-pointer"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            popBubble(bubble.id);
          }}
        />
      ))}
      <div className="absolute bottom-2 left-2 text-sm text-gray-600">Click para crear burbujas, click en una burbuja para explotarla</div>
    </div>
  );
};

// Componente BlockFill
const BlockFill = () => {
  const [grid, setGrid] = useState(Array(36).fill(false));

  const toggleBlock = (index) => {
    const newGrid = [...grid];
    newGrid[index] = !newGrid[index];
    setGrid(newGrid);
  };

  return (
    <div className="grid grid-cols-6 gap-1 max-w-xs mx-auto">
      {grid.map((filled, index) => (
        <button
          key={index}
          className={`w-12 h-12 ${filled ? 'bg-blue-500' : 'bg-gray-200'}`}
          onClick={() => toggleBlock(index)}
        />
      ))}
    </div>
  );
};

// Componente WaterSort
const WaterSort = () => {
  const colors = ['🔴', '🔵', '🟢', '🟡'];
  const [tubes, setTubes] = useState([
    [colors[0], colors[1], colors[2], colors[3]],
    [colors[3], colors[2], colors[1], colors[0]],
    [colors[1], colors[3], colors[0], colors[2]],
    [colors[2], colors[0], colors[3], colors[1]],
    [],
    [],
  ]);
  const [selectedTube, setSelectedTube] = useState(null);

  const handleTubeClick = (index) => {
    if (selectedTube === null) {
      if (tubes[index].length > 0) {
        setSelectedTube(index);
      }
    } else {
      if (index !== selectedTube) {
        const sourceTube = tubes[selectedTube];
        const targetTube = tubes[index];
        if (targetTube.length < 4 && (targetTube.length === 0 || targetTube[targetTube.length - 1] === sourceTube[sourceTube.length - 1])) {
          const newTubes = [...tubes];
          const colorToMove = sourceTube.pop();
          targetTube.push(colorToMove);
          setTubes(newTubes);
        }
      }
      setSelectedTube(null);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {tubes.map((tube, index) => (
        <div
          key={index}
          className={`w-12 h-48 bg-gray-200 flex flex-col-reverse items-center justify-start border-2 ${selectedTube === index ? 'border-red-500' : 'border-gray-400'}`}
          onClick={() => handleTubeClick(index)}
        >
          {tube.map((color, colorIndex) => (
            <div key={colorIndex} className="w-full h-12 flex items-center justify-center text-2xl">
              {color}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Componente FruitMerge
const FruitMerge = () => {
  const fruits = ['🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎'];
  const [grid, setGrid] = useState(Array(16).fill(null).map(() => fruits[Math.floor(Math.random() * 3)]));
  const [score, setScore] = useState(0);

  const mergeFruits = (index) => {
    const newGrid = [...grid];
    const currentFruit = newGrid[index];
    const currentFruitIndex = fruits.indexOf(currentFruit);

    if (currentFruitIndex < fruits.length - 1) {
      newGrid[index] = fruits[currentFruitIndex + 1];
      setScore(score + (currentFruitIndex + 1) * 10);
    }

    const emptySpots = newGrid.reduce((acc, fruit, i) => fruit === null ? [...acc, i] : acc, []);
    if (emptySpots.length > 0) {
      const randomEmptySpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
      newGrid[randomEmptySpot] = fruits[Math.floor(Math.random() * 3)];
    }

    setGrid(newGrid);
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="mb-4 text-xl font-bold">Score: {score}</div>
      <div className="grid grid-cols-4 gap-2">
        {grid.map((fruit, index) => (
          <button
            key={index}
            className="w-16 h-16 bg-yellow-100 flex items-center justify-center text-2xl"
            onClick={() => mergeFruits(index)}
          >
            {fruit}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente NumberConnect
const NumberConnect = () => {
  const [grid, setGrid] = useState(Array(36).fill(null).map(() => Math.floor(Math.random() * 9) + 1));
  const [path, setPath] = useState([]);

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 6);
    const col1 = index1 % 6;
    const row2 = Math.floor(index2 / 6);
    const col2 = index2 % 6;
    return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
  };

  const handleCellClick = (index) => {
    if (path.length === 0 || (isAdjacent(path[path.length - 1], index) && !path.includes(index))) {
      setPath([...path, index]);
    } else {
      setPath([index]);
    }
  };

  const calculateScore = () => {
    return path.reduce((score, index) => score + grid[index], 0);
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="mb-4 text-xl font-bold">Score: {calculateScore()}</div>
      <div className="grid grid-cols-6 gap-1">
        {grid.map((number, index) => (
          <button
            key={index}
            className={`w-12 h-12 flex items-center justify-center text-xl font-bold ${
              path.includes(index) ? 'bg-blue-400' : 'bg-gray-200'
            }`}
            onClick={() => handleCellClick(index)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente ColorCards
const ColorCards = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const [cards, setCards] = useState(shuffle([...colors, ...colors]));
  const [flipped, setFlipped] = useState(Array(12).fill(false));
  const [matched, setMatched] = useState(Array(12).fill(false));
  const [canFlip, setCanFlip] = useState(true);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const handleCardClick = (index) => {
    if (!canFlip || flipped[index] || matched[index]) return;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);

    const flippedCards = newFlipped.reduce((acc, val, idx) => val ? [...acc, idx] : acc, []);

    if (flippedCards.length === 2) {
      setCanFlip(false);
      if (cards[flippedCards[0]] === cards[flippedCards[1]]) {
        const newMatched = [...matched];
        newMatched[flippedCards[0]] = true;
        newMatched[flippedCards[1]] = true;
        setMatched(newMatched);
        setCanFlip(true);
      } else {
        setTimeout(() => {
          const resetFlipped = [...newFlipped];
          resetFlipped[flippedCards[0]] = false;
          resetFlipped[flippedCards[1]] = false;
          setFlipped(resetFlipped);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="grid grid-cols-4 gap-2">
        {cards.map((color, index) => (
          <button
            key={index}
            className={`w-16 h-16 ${flipped[index] || matched[index] ? `bg-${color}-500` : 'bg-gray-300'}`}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Componente ColorConnect
const ColorConnect = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const [grid, setGrid] = useState(Array(36).fill(null).map(() => colors[Math.floor(Math.random() * colors.length)]));
  const [path, setPath] = useState([]);

  const isAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 6);
    const col1 = index1 % 6;
    const row2 = Math.floor(index2 / 6);
    const col2 = index2 % 6;
    return Math.abs(row1 - row2) <= 1 && Math.abs(col1 - col2) <= 1;
  };

  const handleCellClick = (index) => {
    if (path.length === 0 || (isAdjacent(path[path.length - 1], index) && !path.includes(index) && grid[index] === grid[path[0]])) {
      setPath([...path, index]);
    } else {
      setPath([index]);
    }
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="mb-4 text-xl font-bold">Connected: {path.length}</div>
      <div className="grid grid-cols-6 gap-1">
        {grid.map((color, index) => (
          <button
            key={index}
            className={`w-12 h-12 ${path.includes(index) ? 'border-2 border-black' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => handleCellClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const games = [
  { id: 1, name: 'Puntos y Cajas', component: DotAndBoxes, icon: '🔳' },
  { id: 2, name: 'Mancala', component: Mancala, icon: '🔮' },
  { id: 3, name: '2 Player Games', component: TwoPlayerGames, icon: '👥' },
  { id: 4, name: '4 Player Games', component: FourPlayerGames, icon: '👥👥' },
  { id: 5, name: 'Antistress', component: Antistress, icon: '😌' },
  { id: 6, name: 'Block Fill', component: BlockFill, icon: '🧩', isNew: true },
  { id: 7, name: 'Water Sort', component: WaterSort, icon: '🧪' },
  { id: 8, name: 'Fruit Merge', component: FruitMerge, icon: '🍉' },
  { id: 9, name: 'Number Connect', component: NumberConnect, icon: '🔢' },
  { id: 10, name: 'Color Cards', component: ColorCards, icon: '🃏' },
  { id: 11, name: 'Color Connect', component: ColorConnect, icon: '🎨' },
];

const OfflineGamesApp = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    volume: 80,
    music: true,
    darkMode: false,
    vibration: true,
    targetedAds: true,
    resolution: 58,
    maxFps: 60
  });
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
    audioRef.current = new Audio('https://jumpshare.com/s/4JxCQWFzoHcJvSiGBn3D');
    audioRef.current.loop = true;
    if (settings.music) {
      audioRef.current.play();
    }
    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (settings.music) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [settings.music]);

  const toggleMusic = () => {
    setSettings(prev => ({ ...prev, music: !prev.music }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FFF8E7]">
        <motion.div
          className="text-6xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🎮
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${settings.darkMode ? 'bg-gray-900 text-white' : 'bg-[#FFF8E7] text-gray-800'} p-6`}>
      <AnimatePresence>
        {showSettings ? (
          <SettingsScreen settings={settings} setSettings={setSettings} onClose={() => setShowSettings(false)} />
        ) : !selectedGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h1 className={`text-4xl font-bold ${settings.darkMode ? 'text-white' : 'text-[#8B4513]'}`}>Arcade Offline</h1>
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMusic}
                  className="mr-4"
                >
                  <Music className={`w-8 h-8 ${settings.darkMode ? 'text-white' : 'text-[#8B4513]'} ${settings.music ? 'opacity-100' : 'opacity-50'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className={`w-8 h-8 ${settings.darkMode ? 'text-white' : 'text-[#8B4513]'}`} />
                </motion.button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-lg cursor-pointer relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGame(game)}
                >
                  <div className="text-4xl mb-2">{game.icon}</div>
                  <h2 className="text-lg font-semibold">{game.name}</h2>
                  {game.isNew && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      NEW!
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button className={`${settings.darkMode ? 'bg-blue-600' : 'bg-[#8B4513]'} text-white px-4 py-2 rounded-full font-semibold`}>
                REMOVE ADS
              </button>
            </div>
          </motion.div>
        ) : (
          <GameScreen game={selectedGame} onBack={() => setSelectedGame(null)} darkMode={settings.darkMode} />
        )}
      </AnimatePresence>
    </div>
  );
};

const SettingsScreen = ({ settings, setSettings, onClose }) => {
  const handleToggle = (setting) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${settings.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}
    >
      <div className="flex items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="mr-4"
        >
          <ArrowLeft className={`w-6 h-6 ${settings.darkMode ? 'text-white' : 'text-[#8B4513]'}`} />
        </motion.button>
        <h2 className={`text-3xl font-bold ${settings.darkMode ? 'text-white' : 'text-[#8B4513]'}`}>SETTINGS</h2>
      </div>
      
      <div className="space-y-6">
        <SettingSlider icon={Volume2} label="Volume" value={settings.volume} onChange={(v) => setSettings(prev => ({ ...prev, volume: v }))} darkMode={settings.darkMode} />
        <SettingToggle icon={Music} label="Music" value={settings.music} onChange={() => handleToggle('music')} darkMode={settings.darkMode} />
        <SettingToggle icon={Moon} label="Dark Mode" value={settings.darkMode} onChange={() => handleToggle('darkMode')} darkMode={settings.darkMode} />
        <SettingToggle icon={Vibrate} label="Vibration" value={settings.vibration} onChange={() => handleToggle('vibration')} darkMode={settings.darkMode} />
        <SettingToggle icon={Target} label="Targeted Ads" value={settings.targetedAds} onChange={() => handleToggle('targetedAds')} darkMode={settings.darkMode} />
        <SettingSlider icon={Settings} label="Resolution" value={settings.resolution} onChange={(v) => setSettings(prev => ({ ...prev, resolution: v }))} darkMode={settings.darkMode} />
        <SettingSlider icon={Settings} label="Maximum FPS" value={settings.maxFps} onChange={(v) => setSettings(prev => ({ ...prev, maxFps: v }))} darkMode={settings.darkMode} />
      </div>
    </motion.div>
  );
};

const SettingSlider = ({ icon: Icon, label, value, onChange, darkMode }) => (
  <div className="flex items-center">
    <Icon className={`w-6 h-6 mr-4 ${darkMode ? 'text-white' : 'text-[#8B4513]'}`} />
    <div className="flex-grow">
      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
    <span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{value}</span>
  </div>
);

const SettingToggle = ({ icon: Icon, label, value, onChange, darkMode }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <Icon className={`w-6 h-6 mr-4 ${darkMode ? 'text-white' : 'text-[#8B4513]'}`} />
      <label className={`block text-sm font-medium ${darkMode ? 'text-white' : 'text-[#8B4513]'}}>{game.name}</h2>
    <game.component />
  </motion.div>
);

export default OfflineGamesApp;