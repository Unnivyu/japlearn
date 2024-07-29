import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from "../styles/stylesCharacterLessons";
import BackIcon from '../assets/svg/back-icon.svg';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const CharacterLessons = () => {
    const router = useRouter();
    const characters = [
        { romaji: "a", hiragana: "あ", katakana: "ア" },
        { romaji: "i", hiragana: "い", katakana: "イ" },
        { romaji: "u", hiragana: "う", katakana: "ウ" },
        { romaji: "e", hiragana: "え", katakana: "エ" },
        { romaji: "o", hiragana: "お", katakana: "オ" },
        { romaji: "ka", hiragana: "か", katakana: "カ" },
        { romaji: "ki", hiragana: "き", katakana: "キ" },
        { romaji: "ku", hiragana: "く", katakana: "ク" },
        { romaji: "ke", hiragana: "け", katakana: "ケ" },
        { romaji: "ko", hiragana: "こ", katakana: "コ" },
        { romaji: "sa", hiragana: "さ", katakana: "サ" },
        { romaji: "shi", hiragana: "し", katakana: "シ" },
        { romaji: "su", hiragana: "す", katakana: "ス" },
        { romaji: "se", hiragana: "せ", katakana: "セ" },
        { romaji: "so", hiragana: "そ", katakana: "ソ" }
    ];

    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [currentIndexInSet, setCurrentIndexInSet] = useState(0);
    const [showMatchGame, setShowMatchGame] = useState(false);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [message, setMessage] = useState('');
    const [cards, setCards] = useState([]);

    // Split characters into sets of 5
    const sets = [];
    for (let i = 0; i < characters.length; i += 5) {
        sets.push(characters.slice(i, i + 5));
    }

    // Shuffle cards and set the current cards for the match game
    const prepareMatchGame = (setIndex) => {
        const currentSet = sets[setIndex];
        let shuffledSet = shuffleArray([
            ...currentSet.map(c => ({ ...c, type: 'hiragana' })),
            ...currentSet.map(c => ({ ...c, type: 'katakana' }))
        ]);
        setCards(shuffledSet);
    };

    const currentSet = sets[currentSetIndex];
    const currentCharacter = currentSet[currentIndexInSet];
    const currentRomaji = currentSet[Math.floor(matchedPairs.length / 2)]?.romaji;

    const handleNext = () => {
        if (currentIndexInSet === 4) {
            setShowMatchGame(true);
            prepareMatchGame(currentSetIndex);
        } else {
            setCurrentIndexInSet(prevIndex => prevIndex + 1);
        }
    };

    const handleCardFlip = (index, type) => {
        const cardId = `${index}-${type}`;
        const card = cards[index];
        const cardCharacter = card[type]; // Get the character (hiragana or katakana)
    
        // Log the current state
        console.log('Attempting to flip card:', cardId);
        console.log('Currently flipped cards:', flippedCards);
        console.log('Currently matched pairs:', matchedPairs);
        console.log('Currently selected card:', selectedCard);
    
        if (flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
            // Card is already flipped or matched
            console.log('Card is already flipped or matched');
            return;
        }
    
        if (selectedCard) {
            const [selectedIndex, selectedType] = selectedCard.split('-');
            const selectedCardIndex = parseInt(selectedIndex, 10); // Convert to number
            const selectedCardType = selectedType;
    
            if (isNaN(selectedCardIndex) || !selectedCardType) {
                console.error('Invalid selected card data:', selectedCard);
                return;
            }
    
            const selectedCardData = cards[selectedCardIndex];
            const selectedCharacter = selectedCardData[selectedCardType]; // Get the character
    
            if (selectedCardData.romaji === card.romaji && selectedType !== type) {
                // This is a match
                console.log('Match found!');
                setMatchedPairs(prev => {
                    const newPairs = [...prev, cardId, selectedCard];
                    console.log('Matched pairs before update:', prev);
                    console.log('Matched pairs after update:', newPairs);
    
                    // Check if all pairs are matched
                    if (newPairs.length === cards.length) {
                        setMessage('All pairs matched! Moving to next set...');
                        setTimeout(() => {
                            const newIndex = (currentSetIndex + 1) % sets.length;
                            setCurrentSetIndex(newIndex);
                            setCurrentIndexInSet(0);
                            setShowMatchGame(false);
                            setFlippedCards([]);
                            setMatchedPairs([]);
                            setSelectedCard(null);
                            setMessage('');
                            prepareMatchGame(newIndex); // Shuffle and prepare new set
                        }, 2000);
                    } else {
                        // Reset selected card state and flipped cards state
                        setFlippedCards([]);
                        setSelectedCard(null);
                    }
    
                    return newPairs;
                });
            } else {
                // Incorrect match
                console.log('Incorrect match');
                setFlippedCards(prev => [...prev, cardId]);
                setTimeout(() => {
                    setFlippedCards([]);
                    setSelectedCard(null);
                }, 1000);
            }
        } else {
            // First card flip
            console.log('First card flipped');
            setFlippedCards(prev => [...prev, cardId]);
            setSelectedCard(cardId);
        }
    };

    const handleBackPress = () => {
        router.back();
    };

    const handleRestart = () => {
        setCurrentSetIndex(0);
        setCurrentIndexInSet(0);
        setFlippedCards([]);
        setMatchedPairs([]);
        setSelectedCard(null);
        setShowMatchGame(false);
        setCards([]);
        setMessage('');
        prepareMatchGame(0);
    };

    useEffect(() => {
        console.log('Current state:', {
            currentSetIndex,
            currentIndexInSet,
            showMatchGame,
            flippedCards,
            matchedPairs,
            selectedCard,
            cards
        });
    }, [currentSetIndex, currentIndexInSet, showMatchGame, flippedCards, matchedPairs, selectedCard, cards]);

    useEffect(() => {
        prepareMatchGame(currentSetIndex);
    }, [currentSetIndex]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <BackIcon width={30} height={30} />
                </TouchableOpacity>
            </View>
            {!showMatchGame ? (
                <View style={styles.characterDisplay}>
                    <Text style={styles.romaji}>{currentCharacter.romaji}</Text>
                    <Text style={styles.character}>Hiragana: {currentCharacter.hiragana}</Text>
                    <Text style={styles.character}>Katakana: {currentCharacter.katakana}</Text>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.matchGame}>
                    <Text style={styles.matchGameText}>Match the cards for romaji: {currentRomaji}</Text>
                    <View style={styles.cardsContainer}>
                        {cards.map((card, index) => (
                            <TouchableOpacity
                                key={`${index}-${card.type}`}
                                style={styles.card}
                                onPress={() => handleCardFlip(index, card.type)}
                            >
                                <Text style={styles.cardText}>
                                    {flippedCards.includes(`${index}-${card.type}`) || matchedPairs.includes(`${index}-${card.type}`)
                                        ? card[card.type]
                                        : '?'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {message && <Text style={styles.message}>{message}</Text>}
                </View>
            )}
        </View>
    );
};

export default CharacterLessons;
