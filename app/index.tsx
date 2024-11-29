import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";

export const Index = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tutorialCompleted, setTutorialCompleted] = useState<boolean | null>(null);
  
    useEffect(() => {
        const checkTutorialCompletion = async () => {
          try {
            const value = await AsyncStorage.getItem('tutorialCompleted');
            if (value === 'true') {
              setTutorialCompleted(true);
            }
          } catch (e) {
            console.error('Failed to load the data from storage');
          } finally {
            setIsLoading(false);
          }
        };
    
        checkTutorialCompletion();
      }, []);
    
    useEffect(() => {
        if (!isLoading) {
          if (tutorialCompleted) {
            router.push('../(b-user)/');
          } else {
            router.push('../(a-tutorial)/');
          }
        }
      }, [isLoading, tutorialCompleted]);

      if (isLoading || tutorialCompleted === null) {
        return null;
      }

      return (
        <Redirect href={tutorialCompleted ? '../(b-user)/' : '../(a-tutorial)/'} />
      )
}

export default Index;