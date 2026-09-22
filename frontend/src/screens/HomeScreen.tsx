import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { api, Competition, CategoryItem, ChampionItem } from '../services/api';

import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../components/atoms/IconButton';
import { Badge } from '../components/atoms/Badge';
import { Chip } from '../components/atoms/Chip';
import { SearchBar } from '../components/molecules/SearchBar';
import { CompetitionCard } from '../components/organisms/CompetitionCard';
import { ChampionCard } from '../components/organisms/ChampionCard';
import { ReferralBanner } from '../components/organisms/ReferralBanner';

const trustBadges = [
  { icon: 'shield-checkmark', label: '100% Secure' },
  { icon: 'ribbon', label: 'Unbiased Jury' },
  { icon: 'cash', label: 'Direct Payouts' },
] as const;

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeReg, setActiveReg] = useState<any>(null);
  const [megaContest, setMegaContest] = useState<any>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [champions, setChampions] = useState<ChampionItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadData = useCallback(async () => {
    try {
      const [
        userData,
        activeRegData,
        megaData,
        categoriesData,
        competitionsData,
        championsData,
      ] = await Promise.all([
        api.getUserProfile(),
        api.getActiveRegistration(),
        api.getMegaContest(),
        api.getCategories(),
        api.getCompetitions(),
        api.getChampions(),
      ]);

      setUser(userData);
      setActiveReg(activeRegData);
      setMegaContest(megaData);
      setCategories(categoriesData);
      setCompetitions(competitionsData);
      setChampions(championsData);
    } catch (error) {
      console.error('[HomeScreen] Error loading data from API:', error);
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

  const filteredCompetitions = useMemo(() => {
    return competitions.filter((comp) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          comp.title.toLowerCase().includes(q) ||
          comp.category?.toLowerCase().includes(q) ||
          comp.judge?.name.toLowerCase().includes(q) ||
          comp.tags?.some((t) => t.label.toLowerCase().includes(q));
        if (!matchesQuery) return false;
      }

      // Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        const cat = selectedCategory.toLowerCase();
        const matchesCat =
          comp.category?.toLowerCase() === cat ||
          comp.category?.toLowerCase().includes(cat) ||
          comp.tags?.some((t) => t.label.toLowerCase().includes(cat)) ||
          comp.title.toLowerCase().includes(cat);
        if (!matchesCat) return false;
      }

      return true;
    });
  }, [competitions, selectedCategory, searchQuery]);

  const userName = user?.name ? user.name.split(' ')[0] : 'Creator';

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
          <Text style={styles.greeting}>Hello, {userName} 👋</Text>
          <IconButton icon="notifications" accessibilityLabel="Notifications" />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search competitions, judges, tags..."
            onFilterPress={() => setSelectedCategory('All')}
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching arena from database...</Text>
          </View>
        ) : (
          <>
            {/* Active Registration */}
            {activeReg && (
              <View style={styles.activeRegistrationCard}>
                <View style={styles.activeRegHeader}>
                  <Text style={styles.activeRegTitle}>{activeReg.title}</Text>
                  <Badge label={activeReg.status || 'Registered'} type="success" />
                </View>
                <View style={styles.activeRegFooter}>
                  <View style={styles.deadlineContainer}>
                    <Ionicons name="time" size={16} color={colors.error} />
                    <Text style={styles.deadlineText}>Deadline: {activeReg.deadline}</Text>
                  </View>
                  <Pressable
                    style={styles.uploadButton}
                    onPress={() =>
                      navigation.navigate('ContestDetails', {
                        contestId: activeReg.contestId || competitions[0]?.id || '1',
                      })
                    }
                    accessibilityRole="button"
                    accessibilityLabel="Upload submission"
                  >
                    <Ionicons name="cloud-upload" size={16} color={colors.primary} />
                    <Text style={styles.uploadText}>Upload</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* Mega Contest Banner */}
            {megaContest && (
              <View style={styles.megaContestBanner}>
                <View style={styles.megaContestContent}>
                  <Text style={styles.megaContestTitle}>{megaContest.title}</Text>
                  <Text style={styles.megaContestDesc}>{megaContest.description}</Text>
                  <View style={styles.megaContestFooter}>
                    <View>
                      <Text style={styles.prizeLabel}>Prize Pool</Text>
                      <Text style={styles.megaPrize}>{megaContest.prizePool}</Text>
                    </View>
                    <Pressable
                      style={styles.registerButton}
                      onPress={() =>
                        navigation.navigate('ContestDetails', {
                          contestId: megaContest.id || megaContest._id || competitions[0]?.id,
                        })
                      }
                      accessibilityRole="button"
                      accessibilityLabel="Register for Mega Contest"
                    >
                      <Text style={styles.registerText}>Register Now</Text>
                      <Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={styles.categoriesContent}
              >
                {categories.map((cat, idx) => {
                  const isSelected = selectedCategory === cat.label;
                  return (
                    <Chip
                      key={cat.id || idx}
                      label={cat.label}
                      emoji={cat.emoji}
                      isActive={isSelected}
                      onPress={() => setSelectedCategory(cat.label)}
                    />
                  );
                })}
              </ScrollView>
            )}

            {/* Trending Competitions */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'All' ? 'Trending Competitions' : `${selectedCategory} Contests`}
              </Text>
              {selectedCategory !== 'All' ? (
                <Pressable onPress={() => setSelectedCategory('All')}>
                  <Text style={styles.viewAll}>Show All</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => navigation.navigate('Competitions')}
                  accessibilityRole="button"
                  accessibilityLabel="View all competitions"
                >
                  <Text style={styles.viewAll}>View all</Text>
                </Pressable>
              )}
            </View>
            <View style={styles.competitionsContainer}>
              {filteredCompetitions.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="filter-outline" size={32} color="#94a3b8" />
                  <Text style={styles.emptyText}>
                    No competitions found in "{selectedCategory}"
                  </Text>
                  <Pressable
                    style={styles.resetBtn}
                    onPress={() => setSelectedCategory('All')}
                  >
                    <Text style={styles.resetBtnText}>Show All Competitions</Text>
                  </Pressable>
                </View>
              ) : (
                filteredCompetitions.map((comp) => (
                  <CompetitionCard
                    key={comp.id}
                    title={comp.title}
                    tags={comp.tags}
                    prizePool={comp.prizePool}
                    judge={comp.judge}
                    spotsLeft={comp.spotsLeft}
                    totalSpots={comp.totalSpots}
                    entryFee={comp.entryFee}
                    onJoinPress={() => navigation.navigate('ContestDetails', { contestId: comp.id })}
                    onJudgeIntroPress={() => navigation.navigate('ContestDetails', { contestId: comp.id })}
                  />
                ))
              )}
            </View>

            {/* Hall of Champions */}
            {champions.length > 0 && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Hall of Champions</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.championsContainer}
                  contentContainerStyle={styles.championsContent}
                >
                  {champions.map((champ) => (
                    <ChampionCard
                      key={champ.id}
                      name={champ.name}
                      prize={champ.prize}
                      place={champ.place}
                      imageUrl={champ.imageUrl}
                    />
                  ))}
                </ScrollView>
              </>
            )}

            {/* Referral Banner */}
            <ReferralBanner link={user?.referralLink || 'feedants.com/r/creator'} />

            {/* Trust Badges */}
            <View style={styles.trustFooter}>
              {trustBadges.map((badge, index) => (
                <React.Fragment key={badge.label}>
                  <View style={styles.trustBadge}>
                    <Ionicons name={badge.icon as any} size={24} color={colors.onSurfaceVariant} />
                    <Text style={styles.trustText}>{badge.label}</Text>
                  </View>
                  {index < trustBadges.length - 1 && <View style={styles.trustDivider} />}
                </React.Fragment>
              ))}
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
    color: colors.onSurfaceVariant,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: typography.sizes['3xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  searchContainer: {
    marginBottom: spacing.xl,
  },
  activeRegistrationCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.brand200,
    ...shadows.sm,
  },
  activeRegHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  activeRegTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  activeRegFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.semibold,
    color: colors.error,
    marginLeft: 4,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  uploadText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    marginLeft: 4,
  },
  megaContestBanner: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.md,
  },
  megaContestContent: {
    gap: spacing.md,
  },
  megaContestTitle: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  megaContestDesc: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onPrimary,
    opacity: 0.9,
    lineHeight: 20,
  },
  megaContestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.sm,
  },
  prizeLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onPrimary,
    opacity: 0.8,
  },
  megaPrize: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  registerText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  categoriesContainer: {
    marginBottom: spacing.xl,
    marginHorizontal: -spacing.xl,
  },
  categoriesContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
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
  viewAll: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  competitionsContainer: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  championsContainer: {
    marginBottom: spacing.xl,
    marginHorizontal: -spacing.xl,
  },
  championsContent: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  trustFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  trustBadge: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  trustText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  trustDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.outlineVariant,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e8eeee',
    gap: 8,
  },
  emptyText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  resetBtn: {
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e6f7f5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#bce4da',
  },
  resetBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007d79',
  },
});
