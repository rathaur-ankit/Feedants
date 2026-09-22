import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { api } from '../services/api';

import { SearchBar } from '../components/molecules/SearchBar';
import { Chip } from '../components/atoms/Chip';
import { JudgeCard } from '../components/molecules/JudgeCard';
import { CategoryCard } from '../components/molecules/CategoryCard';
import { LeaderboardPodium } from '../components/organisms/LeaderboardPodium';
import { VideoCard } from '../components/molecules/VideoCard';
import { Badge } from '../components/atoms/Badge';

export const ExploreScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exploreData, setExploreData] = useState<any>(null);
  const [activeFilterId, setActiveFilterId] = useState('1');

  const loadData = useCallback(async () => {
    try {
      const data = await api.getExploreData();
      setExploreData(data);
    } catch (error) {
      console.error('[ExploreScreen] Error fetching data from database:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleVote = async (submissionId: string) => {
    try {
      await api.voteSubmission(submissionId);
      // Refresh submissions to reflect the new vote count
      loadData();
    } catch (error) {
      console.error('Failed to vote:', error);
    }
  };

  const filters = exploreData?.filters || [
    { id: '1', label: 'All Talents' },
    { id: '2', label: 'Trending Videos' },
    { id: '3', label: 'Top Judges' },
    { id: '4', label: 'Rising Stars' },
    { id: '5', label: 'Workshops' },
  ];

  const judgesMasterclass = exploreData?.judgesMasterclass || [];
  const exploreCategories = exploreData?.popularCategories || [];
  const leaderboard = exploreData?.leaderboard || [];
  const trendingSubmissions = exploreData?.trendingSubmissions || [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.spotlightLabel}>FEEDANTS SPOTLIGHT</Text>
            <Text style={styles.title}>Explore & Discover</Text>
          </View>
          <Badge label="LIVE NOW" type="hot" />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar showMic onMicPress={() => {}} onFilterPress={() => {}} />
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter: any) => (
            <Chip
              key={filter.id}
              label={filter.label}
              isActive={activeFilterId === filter.id}
              onPress={() => setActiveFilterId(filter.id)}
            />
          ))}
        </ScrollView>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching spotlight from database...</Text>
          </View>
        ) : (
          <>
            {/* Learn from Judges */}
            {judgesMasterclass.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Learn from Judges</Text>
                  <Text style={styles.viewAll}>See all</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.judgesContainer}
                  contentContainerStyle={styles.horizontalContent}
                >
                  {judgesMasterclass.map((judge: any) => (
                    <JudgeCard
                      key={judge._id || judge.id}
                      name={judge.name}
                      specialty={judge.specialty}
                      rating={judge.rating}
                      reviews={judge.reviews}
                      nextClass={judge.nextClass}
                      price={judge.price}
                      imageUrl={judge.imageUrl}
                    />
                  ))}
                </ScrollView>
              </>
            )}

            {/* Popular Categories */}
            {exploreCategories.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Popular Categories</Text>
                </View>
                <View style={styles.gridContainer}>
                  {exploreCategories.map((cat: any) => (
                    <View key={cat._id || cat.id} style={styles.gridItem}>
                      <CategoryCard
                        icon={cat.icon || 'body'}
                        title={cat.label || cat.name}
                        subtitle={cat.subtitle || 'Competitions'}
                        liveCount={cat.liveCount || 0}
                      />
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Monthly Leaderboard */}
            {leaderboard.length > 0 && <LeaderboardPodium topThree={leaderboard} />}

            {/* Trending Submissions */}
            {trendingSubmissions.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Trending Submissions</Text>
                  <View style={styles.liveVotingBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveVotingText}>Live Voting</Text>
                  </View>
                </View>
                <View style={styles.videosContainer}>
                  {trendingSubmissions.map((video: any) => (
                    <Pressable
                      key={video._id || video.id}
                      onPress={() => handleVote(video._id || video.id)}
                    >
                      <VideoCard
                        title={video.title}
                        subtitle={video.subtitle || `${video.votes} community votes`}
                        judgeScore={String(video.judgeScore || '4.5')}
                        duration={video.duration || '02:30'}
                        views={String(video.views || 0)}
                        votes={String(video.votes || 0)}
                        performer={video.performer}
                        thumbnailUrl={video.thumbnailUrl || video.mediaUrl}
                      />
                    </Pressable>
                  ))}
                </View>
              </>
            )}

            {/* Invite Prompt */}
            <View style={styles.invitePrompt}>
              <View style={styles.inviteContent}>
                <View style={styles.inviteIcon}>
                  <Ionicons name="gift" size={24} color={colors.amber500} />
                </View>
                <Text style={styles.inviteText}>Invite talent, earn ₹50</Text>
              </View>
              <View style={styles.inviteButton}>
                <Text style={styles.inviteButtonText}>Refer</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.xl,
    paddingBottom: spacing['6xl'],
  },
  loadingContainer: {
    paddingVertical: spacing['4xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.sm,
    color: colors.onSurfaceVariant,
    fontFamily: typography.fontFamily,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  spotlightLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  searchContainer: {
    marginBottom: spacing.lg,
  },
  filtersContainer: {
    marginBottom: spacing.xl,
    marginHorizontal: -spacing.xl,
  },
  filtersContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  viewAll: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  judgesContainer: {
    marginBottom: spacing.xl,
    marginHorizontal: -spacing.xl,
  },
  horizontalContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  gridItem: {
    width: '47.5%',
  },
  liveVotingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
  },
  liveVotingText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.error,
  },
  videosContainer: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  invitePrompt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  inviteContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  inviteIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  inviteButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  inviteButtonText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
});
