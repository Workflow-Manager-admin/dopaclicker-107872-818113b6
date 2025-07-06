import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { gameService } from '../api/gameService';

export const useGame = () => {
  const queryClient = useQueryClient();

  // Query for game state
  const { data: gameState, isLoading: isLoadingGameState } = useQuery({
    queryKey: ['gameState'],
    queryFn: gameService.getGameState,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Query for upgrades
  const { data: upgrades, isLoading: isLoadingUpgrades } = useQuery({
    queryKey: ['upgrades'],
    queryFn: gameService.getUpgrades,
  });

  // Query for leaderboard
  const { data: leaderboard, isLoading: isLoadingLeaderboard } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: gameService.getLeaderboard,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Mutation for clicks
  const clickMutation = useMutation({
    mutationFn: gameService.registerClick,
    onSuccess: () => {
      queryClient.invalidateQueries(['gameState']);
    },
  });

  // Mutation for upgrades
  const upgradeMutation = useMutation({
    mutationFn: gameService.purchaseUpgrade,
    onSuccess: () => {
      queryClient.invalidateQueries(['gameState']);
      queryClient.invalidateQueries(['upgrades']);
    },
  });

  return {
    gameState,
    upgrades,
    leaderboard,
    isLoading: isLoadingGameState || isLoadingUpgrades || isLoadingLeaderboard,
    handleClick: (clickPower) => clickMutation.mutate(clickPower),
    handleUpgrade: (upgradeId) => upgradeMutation.mutate(upgradeId),
  };
};
