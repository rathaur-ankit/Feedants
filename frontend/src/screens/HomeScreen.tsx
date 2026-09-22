import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import {
  userData,
  activeRegistration,
  megaContest,
  categories,
  competitions,
  champions,
  trustBadges
} from '../data/mockData';

import { useNavigation } from '@react-navigation/native';
import { IconButton } from '../components/atoms/IconButton';
import { Badge } from '../components/atoms/Badge';
import { Chip } from '../components/atoms/Chip';
import { SearchBar } from '../components/molecules/SearchBar';
import { CompetitionCard } from '../components/organisms/CompetitionCard';
import { ChampionCard } from '../components/organisms/ChampionCard';
import { ReferralBanner } from '../components/organisms/ReferralBanner';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {userData.name.split(' ')[0]} 👋</Text>
          <IconButton icon="notifications" accessibilityLabel="Notifications" />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar onFilterPress={() => {}} />
        </View>

        {/* Active Registration */}
        <View style={styles.activeRegistrationCard}>
          <View style={styles.activeRegHeader}>
            <Text style={styles.activeRegTitle}>{activeRegistration.title}</Text>
            <Badge label={activeRegistration.status} type="success" />
          </View>
          <View style={styles.activeRegFooter}>
            <View style={styles.deadlineContainer}>
              <Ionicons name="time" size={16} color={colors.error} />
              <Text style={styles.deadlineText}>Deadline: {activeRegistration.deadline}</Text>
            </View>
            <Pressable
              style={styles.uploadButton}
              onPress={() => navigation.navigate('ContestDetails', { contestId: '1' })}
              accessibilityRole="button"
              accessibilityLabel="Upload submission"
            >
              <Ionicons name="cloud-upload" size={16} color={colors.primary} />
              <Text style={styles.uploadText}>Upload</Text>
            </Pressable>
          </View>
        </View>

        {/* Mega Contest Banner */}
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
                onPress={() => navigation.navigate('ContestDetails', { contestId: '3' })}
                accessibilityRole="button"
                accessibilityLabel="Register for Mega Contest"
              >
                <Text style={styles.registerText}>Register Now</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.onPrimary} />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={styles.categoriesContent}>
          {categories.map((cat) => (
            <Chip
              key={cat.id}
              label={cat.label}
              emoji={cat.emoji}
              isActive={cat.isActive}
              onPress={() => navigation.navigate('Competitions')}
            />
          ))}
        </ScrollView>

        {/* Trending Competitions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Competitions</Text>
          <Pressable
            onPress={() => navigation.navigate('Competitions')}
            accessibilityRole="button"
            accessibilityLabel="View all competitions"
          >
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        </View>
        <View style={styles.competitionsContainer}>
          {competitions.map((comp) => (
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
          ))}
        </View>

        {/* Hall of Champions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hall of Champions</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.championsContainer} contentContainerStyle={styles.championsContent}>
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

        {/* Referral */}
        <ReferralBanner link={userData.referralLink} />

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
  },
  megaContestTitle: {
    fontSize: typography.sizes['2xl'],
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
    marginBottom: spacing.sm,
  },
  megaContestDesc: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onPrimaryContainer,
    marginBottom: spacing.lg,
  },
  megaContestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  prizeLabel: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onPrimaryContainer,
    marginBottom: 2,
  },
  megaPrize: {
    fontSize: typography.sizes.xl,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.amber500,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  registerText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
    marginRight: 4,
  },
  categoriesContainer: {
    marginBottom: spacing.xl,
  },
  categoriesContent: {
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
  competitionsContainer: {
    marginBottom: spacing.xl,
  },
  championsContainer: {
    marginHorizontal: -spacing.xl,
    marginBottom: spacing.xl,
  },
  championsContent: {
    paddingHorizontal: spacing.xl,
  },
  trustFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.surfaceContainer,
    borderRadius: borderRadius.lg,
  },
  trustBadge: {
    alignItems: 'center',
    flex: 1,
  },
  trustText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  trustDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.outlineVariant,
  },
});
