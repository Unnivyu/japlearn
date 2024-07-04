import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const MatchGame = ({ options, onComplete }) => {
  const [gameOptions, setGameOptions] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    if (options.length > 0) {
      addCards(0); // Start the game with the first character pair
    }
  }, [options]);

  const addCards = (index) => {
    let newOptions = [];
    for (let i = 0; i <= index; i++) {
      newOptions.push(
        { id: options[i].hiragana, value: options[i].hiragana, matchId: options[i].english },
        { id: options[i].english, value: options[i].english, matchId: options[i].hiragana }
      );
    }
    newOptions = shuffle(newOptions);
    setGameOptions(newOptions);
    setCurrentTarget({ hiragana: options[index].hiragana, english: options[index].english });
  };

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  const handleFlip = (index) => {
    if (flippedIndexes.includes(index) || flippedIndexes.length === 2) {
      return;
    }

    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    if (newFlippedIndexes.length === 2) {
      const firstCard = gameOptions[newFlippedIndexes[0]];
      const secondCard = gameOptions[newFlippedIndexes[1]];

      if (firstCard.id === currentTarget.hiragana && secondCard.id === currentTarget.english ||
          firstCard.id === currentTarget.english && secondCard.id === currentTarget.hiragana) {
        setMatchedPairs(prev => [...prev, firstCard.matchId]);
        setFlippedIndexes([]);

        if (matchedPairs.length < options.length - 1) {
          addCards(matchedPairs.length + 1);
        } else {
          onComplete();
        }
      } else {
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      {currentTarget && (
        <Text style={styles.prompt}>
          Match: {currentTarget.hiragana} with {currentTarget.english}
        </Text>
      )}
      <View style={styles.cardsContainer}>
        {gameOptions.map((option, idx) => (
          <TouchableOpacity key={idx} style={styles.card} onPress={() => handleFlip(idx)}>
            <Text style={styles.cardText}>
              {flippedIndexes.includes(idx) ? option.value : 'Flip'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  prompt: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
  },
  cardText: {
    fontSize: 24,
  },
});

export default MatchGame;
