import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from "../styles/stylesCharacterLessons";
import BackIcon from '../assets/svg/back-icon.svg';
import cardBackImage from '../assets/img/card_back.png';
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
        setFlippedCards([]);
        setMatchedPairs([]);
        setSelectedCard(null);
    };

    const currentSet = sets[currentSetIndex];
    const currentCharacter = currentSet[currentIndexInSet];
    const currentRomaji = currentSet[Math.floor(matchedPairs.length / 2)]?.romaji;

    const handleNext = () => {
        if (currentIndexInSet === 4) {
            if (showMatchGame) {
                // Move to the next set if all pairs are matched
                const newSetIndex = currentSetIndex + 1;
                if (newSetIndex < sets.length) {
                    // Move to the next set
                    setCurrentSetIndex(newSetIndex);
                    setCurrentIndexInSet(0);
                    setShowMatchGame(false); // Show character display again
                    setMessage('');
                } else {
                    // Optionally, show a message or handle the end of the game
                    setMessage('All sets completed!');
                }
            } else {
                // Start the match game for the current set
                setShowMatchGame(true);
                prepareMatchGame(currentSetIndex);
            }
        } else {
            setCurrentIndexInSet(prevIndex => prevIndex + 1);
        }
    };

    const handleCardFlip = (index, type) => {
        const cardId = `${index}-${type}`;
        const card = cards[index];
    
        // If card is already matched or currently flipped, do nothing
        if (matchedPairs.includes(cardId) || flippedCards.includes(cardId)) {
            return;
        }
    
        // If two cards are already flipped, do nothing
        if (flippedCards.length === 2) {
            return;
        }
    
        // Add card to flipped cards
        setFlippedCards(prev => [...prev, cardId]);
    
        if (selectedCard) {
            // There is already a selected card, so check for match
            const [selectedIndex, selectedType] = selectedCard.split('-');
            const selectedCardIndex = parseInt(selectedIndex, 10);
            const selectedCardData = cards[selectedCardIndex];
    
            if (selectedCardData.romaji === card.romaji && selectedType !== type && card.romaji === currentRomaji) {
                // Match found and corresponds to the current displayed romaji
                setMatchedPairs(prev => [...prev, cardId, selectedCard]);
    
                // Remove matched cards from visibility after 1 second
                setTimeout(() => {
                    setFlippedCards(prev => prev.filter(id => id !== cardId && id !== selectedCard));
                    setSelectedCard(null); // Reset selected card
    
                    // Check if all pairs are matched
                    if (matchedPairs.length + 2 === cards.length) {
                        // All pairs matched, move to next set or complete the game
                        setTimeout(() => {
                            const newSetIndex = currentSetIndex + 1;
                            if (newSetIndex < sets.length) {
                                setCurrentSetIndex(newSetIndex);
                                setCurrentIndexInSet(0);
                                setShowMatchGame(false); // Show character display again
                                setMessage('');
                            } else {
                                setMessage('All sets completed!');
                            }
                        }, 1000);
                    }
                }, 1000); // Delay before hiding matched cards
            } else {
                // Incorrect match or doesn't correspond to current displayed romaji
                setTimeout(() => {
                    setFlippedCards(prev => prev.filter(id => id !== cardId && id !== selectedCard));
                    setSelectedCard(null); // Reset selected card
                }, 1000); // Delay before hiding unmatched cards
            }
        } else {
            // First card flip
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
        prepareMatchGame(currentSetIndex);
    }, [currentSetIndex]);

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

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={styles.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
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
                        {cards.map((card, index) => {
                            const cardId = `${index}-${card.type}`;
                            const isCardFlipped = flippedCards.includes(cardId);
                            const isCardMatched = matchedPairs.includes(cardId);

                            // Only show cards that are not matched
                            const cardStyle = {
                                ...styles.card,
                                opacity: isCardMatched ? 0 : 1
                            };

                            return (
                                <TouchableOpacity
                                    key={cardId}
                                    style={cardStyle}
                                    onPress={() => handleCardFlip(index, card.type)}
                                    disabled={isCardMatched || flippedCards.length === 2} // Disable interaction for matched cards and when two cards are flipped
                                >
                                    {isCardFlipped || isCardMatched ? (
                                        <Text style={styles.cardText}>{card[card.type]}</Text>
                                    ) : (
                                        <Image source={cardBackImage} style={styles.cardImage} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    {message && <Text style={styles.message}>{message}</Text>}
                </View>
            )}
        </View>
    );
};

export default CharacterLessons;
