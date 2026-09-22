import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { api, Competition, CategoryItem } from '../services/api';
import { RootStackParamList } from '../navigation/types';

import { SearchBar } from '../components/molecules/SearchBar';
import { Chip } from '../components/atoms/Chip';
import { Badge } from '../components/atoms/Badge';
import { CompetitionCard } from '../components/organisms/CompetitionCard';

type StatusFilter = 'all' | 'live' | 'upcoming' | 'registered';

export const CompetitionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [baseCompetitions, setBaseCompetitions] = useState<Competition[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [megaContest, setMegaContest] = useState<any>(null);
  const [activeRegistration, setActiveRegistration] = useState<any>(null);

  const statusFilters: { id: StatusFilter; label: string }[] = [
    { id: 'all', label: 'All Contests' },
    { id: 'live', label: 'Live Now' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'registered', label: 'Registered (1)' },
  ];

  const loadData = useCallback(async () => {
    try {
      const [comps, cats, mega, activeReg] = await Promise.all([
        api.getCompetitions(),
        api.getCategories(),
        api.getMegaContest(),
        api.getActiveRegistration(),
      ]);

      setBaseCompetitions(comps);
      setCategories(cats);
      setMegaContest(mega);
      setActiveRegistration(activeReg);
    } catch (error) {
      console.error('[CompetitionsScreen] Error fetching data:', error);
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

  // Filter competitions based on search, category, and status
  const filteredCompetitions = useMemo(() => {
    return baseCompetitions.filter((comp) => {
      // Search query check
      const matchesSearch =
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.judge?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.tags?.some((t) => t.label.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category check
      if (selectedCategory !== 'All') {
        const matchesCategory =
          comp.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          comp.tags?.some((t) => t.label.toLowerCase().includes(selectedCategory.toLowerCase()));
        if (!matchesCategory) return false;
      }

      // Status check
      if (selectedStatus === 'registered') {
        return comp.status === 'registered' || comp.id === activeRegistration?.contestId;
      } else if (selectedStatus === 'upcoming') {
        return comp.spotsLeft > 30 || comp.status === 'upcoming';
      } else if (selectedStatus === 'live') {
        return comp.spotsLeft <= 30 || comp.status === 'live';
      }

      return true;
    });
  }, [baseCompetitions, searchQuery, selectedCategory, selectedStatus, activeRegistration]);

  const handleJoinContest = (contestId: string) => {
    navigation.navigate('ContestDetails', { contestId });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('all');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {/* Screen Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSubtitle}>FEEDANTS ARENA</Text>
            <Text style={styles.headerTitle}>Competitions</Text>
          </View>
          <View style={styles.trophyIconWrapper}>
            <Ionicons name="trophy" size={24} color={colors.primary} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchWrapper}>
          <SearchBar
            placeholder="Search contests, judges, tags..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            showMic
            onMicPress={() => {}}
          />
        </View>

        {/* Status Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.statusFiltersContainer}
          contentContainerStyle={styles.statusFiltersContent}
        >
          {statusFilters.map((tab) => {
            const isActive = selectedStatus === tab.id;
            return (
              <Pressable
                key={tab.id}
                style={[styles.statusTab, isActive && styles.statusTabActive]}
                onPress={() => setSelectedStatus(tab.id)}
                accessibilityRole="button"
                accessibilityLabel={tab.label}
              >
                <Text
                  style={[
                    styles.statusTabText,
                    isActive && styles.statusTabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Categories Chips */}
        {categories.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <Chip
                  key={cat.id}
                  label={cat.label}
                  emoji={cat.emoji}
                  isActive={isActive}
                  onPress={() => setSelectedCategory(cat.label)}
                />
              );
            })}
          </ScrollView>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching competitions from database...</Text>
          </View>
        ) : (
          <>
            {/* Mega Contest Featured Card */}
            {selectedStatus !== 'registered' && megaContest && (
              <View style={styles.megaCard}>
                <View style={styles.megaBadgeRow}>
                  <Badge label="MEGA CONTEST" type="hot" />
                  <View style={styles.countdownBadge}>
                    <Ionicons name="timer-outline" size={14} color={colors.onErrorContainer} />
                    <Text style={styles.countdownText}>Ends in {megaContest.endsIn || '2 days'}</Text>
                  </View>
                </View>

                <Text style={styles.megaTitle}>{megaContest.title}</Text>
                <Text style={styles.megaDescription}>{megaContest.description}</Text>

                <View style={styles.megaFooter}>
                  <View>
                    <Text style={styles.megaPrizeLabel}>Guaranteed Prize Pool</Text>
                    <Text style={styles.megaPrizeValue}>{megaContest.prizePool}</Text>
                  </View>
                  <Pressable
                    style={styles.megaButton}
                    onPress={() =>
                      handleJoinContest(megaContest.id || megaContest._id || baseCompetitions[0]?.id)
                    }
                    accessibilityRole="button"
                    accessibilityLabel="Register for Mega Contest"
                  >
                    <Text style={styles.megaButtonText}>Register Now</Text>
                    <Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />
                  </Pressable>
                </View>
              </View>
            )}

            {/* Active Registration Quick Bar */}
            {selectedStatus === 'registered' && activeRegistration && (
              <View style={styles.activeRegistrationBanner}>
                <View style={styles.activeRegLeft}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  <View style={styles.activeRegTextWrap}>
                    <Text style={styles.activeRegTitle}>{activeRegistration.title}</Text>
                    <Text style={styles.activeRegDeadline}>
                      Deadline: {activeRegistration.deadline}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={styles.uploadBtn}
                  onPress={() =>
                    handleJoinContest(activeRegistration.contestId || baseCompetitions[0]?.id || '1')
                  }
                  accessibilityRole="button"
                >
                  <Ionicons name="cloud-upload" size={14} color={colors.onPrimary} />
                  <Text style={styles.uploadBtnText}>Upload</Text>
                </Pressable>
              </View>
            )}

            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedStatus === 'registered'
                  ? 'Your Registered Contests'
                  : selectedCategory === 'All'
                  ? 'All Competitions'
                  : `${selectedCategory} Contests`}
              </Text>
              <Text style={styles.countText}>
                {filteredCompetitions.length} available
              </Text>
            </View>

            {/* Competitions List */}
            {filteredCompetitions.length > 0 ? (
              <View style={styles.competitionsList}>
                {filteredCompetitions.map((comp) => (
                  <CompetitionCard
                    key={comp.id}
                    title={comp.title}
                    tags={comp.tags}
                    prizePool={comp.prizePool}
                    judge={comp.judge}
                    spotsLeft={comp.spotsLeft}
                    totalSpots={comp.totalSpots}
                    entryFee={comp.entryFee}
                    onJoinPress={() => handleJoinContest(comp.id)}
                    onJudgeIntroPress={() => handleJoinContest(comp.id)}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color={colors.outlineVariant} />
                <Text style={styles.emptyTitle}>No competitions found</Text>
                <Text style={styles.emptySubtitle}>
                  Try adjusting your search query or selecting a different category filter.
                </Text>
                <Pressable
                  style={styles.resetButton}
                  onPress={handleResetFilters}
                  accessibilityRole="button"
                  accessibilityLabel="Reset all filters"
                >
                  <Text style={styles.resetButtonText}>Reset Filters</Text>
                </Pressable>
              </View>
            )}
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
    color: colors.onSurfaceVariant,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerSubtitle: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  trophyIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWrapper: {
    marginBottom: spacing.lg,
  },
  statusFiltersContainer: {
    marginBottom: spacing.md,
    marginHorizontal: -spacing.xl,
  },
  statusFiltersContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  statusTab: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  statusTabActive: {
    backgroundColor: colors.primary,
  },
  statusTabText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.medium,
    color: colors.onSurfaceVariant,
  },
  statusTabTextActive: {
    color: colors.onPrimary,
    fontWeight: typography.weights.bold,
  },
  categoriesContainer: {
    marginBottom: spacing.xl,
    marginHorizontal: -spacing.xl,
  },
  categoriesContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  megaCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  megaBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  countdownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  countdownText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  megaTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
    marginBottom: spacing.xs,
  },
  megaDescription: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onPrimary,
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  megaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  megaPrizeLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onPrimary,
    opacity: 0.8,
  },
  megaPrizeValue: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  megaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  megaButtonText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  activeRegistrationBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.brand200,
    ...shadows.sm,
  },
  activeRegLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  activeRegTextWrap: {
    flex: 1,
  },
  activeRegTitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  activeRegDeadline: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.error,
    marginTop: 2,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  uploadBtnText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  countText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
  },
  competitionsList: {
    gap: spacing.lg,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['4xl'],
    gap: spacing.sm,
  },
  emptyTitle: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: spacing['2xl'],
    lineHeight: 20,
  },
  resetButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.full,
  },
  resetButtonText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
});
