import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import {
  exploreFilters,
  judgesMasterclass,
  exploreCategories,
  leaderboard,
  trendingSubmissions
} from '../data/mockData';

import { SearchBar } from '../components/molecules/SearchBar';
import { Chip } from '../components/atoms/Chip';
import { JudgeCard } from '../components/molecules/JudgeCard';
import { CategoryCard } from '../components/molecules/CategoryCard';
import { LeaderboardPodium } from '../components/organisms/LeaderboardPodium';
import { VideoCard } from '../components/molecules/VideoCard';
import { Badge } from '../components/atoms/Badge';

export const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer} contentContainerStyle={styles.filtersContent}>
          {exploreFilters.map((filter) => (
            <Chip key={filter.id} label={filter.label} isActive={filter.isActive} />
          ))}
        </ScrollView>

        {/* Learn from Judges */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Learn from Judges</Text>
          <Text style={styles.viewAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.judgesContainer} contentContainerStyle={styles.horizontalContent}>
          {judgesMasterclass.map((judge) => (
            <JudgeCard
              key={judge.id}
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

        {/* Popular Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
        </View>
        <View style={styles.gridContainer}>
          {exploreCategories.map((cat) => (
            <View key={cat.id} style={styles.gridItem}>
              <CategoryCard
                icon={cat.icon}
                title={cat.title}
                subtitle={cat.subtitle}
                liveCount={cat.liveCount}
              />
            </View>
          ))}
        </View>

        {/* Monthly Leaderboard */}
        <LeaderboardPodium topThree={leaderboard} />

        {/* Trending Submissions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Submissions</Text>
          <View style={styles.liveVotingBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveVotingText}>Live Voting</Text>
          </View>
        </View>
        <View style={styles.videosContainer}>
          {trendingSubmissions.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              subtitle={video.subtitle}
              judgeScore={video.judgeScore}
              duration={video.duration}
              views={video.views}
              votes={video.votes}
              performer={video.performer}
              thumbnailUrl={video.thumbnailUrl}
            />
          ))}
        </View>

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
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  searchContainer: {
    marginBottom: spacing.xl,
  },
  filtersContainer: {
    marginBottom: spacing.xl,
  },
  filtersContent: {
    paddingRight: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  viewAll: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
    color: colors.primary,
  },
  judgesContainer: {
    marginHorizontal: -spacing.xl,
    marginBottom: spacing.xl,
  },
  horizontalContent: {
    paddingHorizontal: spacing.xl,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  gridItem: {
    width: '48%',
  },
  liveVotingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.error,
    marginRight: 4,
  },
  liveVotingText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onErrorContainer,
  },
  videosContainer: {
    marginBottom: spacing.xl,
  },
  invitePrompt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  inviteContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.amber100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  inviteText: {
    fontSize: typography.sizes.md,
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
    color: colors.onPrimary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
  },
});
