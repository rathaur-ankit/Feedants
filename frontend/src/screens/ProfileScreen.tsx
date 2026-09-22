import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../theme';
import { api } from '../services/api';

// Custom Components
import { ProfileHeader } from '../components/molecules/ProfileHeader';
import { StatItem } from '../components/molecules/StatItem';
import { SettingsMenuItem } from '../components/molecules/SettingsMenuItem';
import { WalletCard } from '../components/organisms/WalletCard';
import { AchievementCard } from '../components/organisms/AchievementCard';
import { CompetitionListCard } from '../components/organisms/CompetitionListCard';

const profileMenuItems = [
  { id: '1', icon: 'card', label: 'Payment Methods & UPI', value: 'Primary linked', valueColor: 'primary' as const },
  { id: '2', icon: 'people', label: 'Refer & Earn', badge: '₹10/signup' },
  { id: '3', icon: 'notifications', label: 'Notification Preferences' },
  { id: '4', icon: 'help-circle', label: 'Help & Razorpay FAQs', subtitle: 'Payment safety, refunds & rules' },
  { id: '5', icon: 'information-circle', label: 'About Feedants', value: 'v2.4.1' },
] as const;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [userCompetitions, setUserCompetitions] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [activeFilterId, setActiveFilterId] = useState('1');

  const loadData = useCallback(async () => {
    try {
      const [profile, comps, achs] = await Promise.all([
        api.getUserProfile(),
        api.getUserCompetitions(),
        api.getUserAchievements(),
      ]);

      setUserData(profile);
      setUserCompetitions(comps);
      setAchievements(achs.achievements || []);
      setVerifiedCount(achs.verifiedCount || 0);
    } catch (error) {
      console.error('[ProfileScreen] Error fetching profile data from database:', error);
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

  const profileFilters = [
    { id: '1', label: `Registered (${userCompetitions.length})` },
    { id: '2', label: 'Submissions (5)' },
    { id: '3', label: `Certificates (${verifiedCount})` },
    { id: '4', label: 'Saved' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ProfileHeader title="My Profile" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Fetching profile from database...</Text>
          </View>
        ) : (
          <>
            {/* User Card */}
            {userData && (
              <View style={styles.userCard}>
                <View style={styles.userInfoRow}>
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: userData.avatarUrl }} style={styles.avatar} />
                    <Pressable
                      style={styles.editAvatarBtn}
                      accessibilityRole="button"
                      accessibilityLabel="Edit photo"
                    >
                      <Ionicons name="camera" size={14} color={colors.onPrimary} />
                    </Pressable>
                  </View>
                  <View style={styles.userDetails}>
                    <View style={styles.nameRow}>
                      <Text style={styles.name}>{userData.name}</Text>
                      {userData.isVerified && (
                        <Ionicons
                          name="checkmark-circle"
                          size={16}
                          color={colors.primary}
                          style={styles.verifiedIcon}
                        />
                      )}
                    </View>
                    <Text style={styles.username}>{userData.username}</Text>

                    <View style={styles.tagsRow}>
                      {userData.tags?.map((tag: string, index: number) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>

                <View style={styles.statsGrid}>
                  <StatItem label="Contests" value={userData.stats?.contestsJoined ?? 0} />
                  <View style={styles.statDivider} />
                  <StatItem label="Podiums Won" value={userData.stats?.podiumsWon ?? 0} />
                  <View style={styles.statDivider} />
                  <StatItem label="Earnings" value={userData.stats?.totalEarnings ?? '₹0'} />
                </View>
              </View>
            )}

            {/* Wallet Banner */}
            <WalletCard balance={userData?.wallet?.balance || '₹0'} />

            {/* My Competitions */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>My Competitions</Text>
                <Pressable
                  onPress={() => navigation.navigate('Competitions')}
                  accessibilityRole="button"
                  accessibilityLabel="Manage all competitions"
                >
                  <Text style={styles.manageText}>Manage ({userCompetitions.length})</Text>
                </Pressable>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersList}
              >
                {profileFilters.map((filter) => (
                  <Pressable
                    key={filter.id}
                    style={[styles.filterPill, activeFilterId === filter.id && styles.filterPillActive]}
                    onPress={() => setActiveFilterId(filter.id)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        activeFilterId === filter.id && styles.filterTextActive,
                      ]}
                    >
                      {filter.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>

              <View style={styles.competitionsList}>
                {userCompetitions.map((comp) => (
                  <CompetitionListCard
                    key={comp.id}
                    title={comp.title}
                    category={comp.category}
                    status={comp.status}
                    deadline={comp.deadline}
                    imageUrl={comp.imageUrl}
                    slot={comp.slot}
                    onPress={() => navigation.navigate('ContestDetails', { contestId: comp.id })}
                    onUploadPress={() =>
                      navigation.navigate('MainTabs', {
                        screen: 'Create',
                        params: { capturedUri: undefined },
                      })
                    }
                  />
                ))}
              </View>
            </View>

            {/* Achievements & Certificates */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.titleRow}>
                  <Ionicons name="medal" size={20} color={colors.amber500} />
                  <Text style={styles.sectionTitleWithIcon}>Achievements & Certificates</Text>
                </View>
                <Text style={styles.verifiedCountText}>{verifiedCount} Verified</Text>
              </View>

              {achievements.map((ach) => (
                <AchievementCard
                  key={ach._id || ach.id || ach.title}
                  title={ach.title}
                  description={ach.description}
                  date={ach.date}
                />
              ))}
            </View>

            {/* Referral Banner */}
            <Pressable style={styles.referralBanner}>
              <View style={styles.referralIconContainer}>
                <Ionicons name="megaphone" size={24} color={colors.primary} />
              </View>
              <View style={styles.referralTextContainer}>
                <Text style={styles.referralTitle}>Invite Friends & Earn</Text>
                <Text style={styles.referralSubtitle}>
                  Get ₹50 for every friend who joins a contest.
                </Text>
              </View>
              <View style={styles.inviteBtn}>
                <Text style={styles.inviteBtnText}>Invite</Text>
              </View>
            </Pressable>

            {/* Settings Menu List */}
            <View style={styles.settingsMenu}>
              {profileMenuItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <SettingsMenuItem
                    icon={item.icon as any}
                    label={item.label}
                    subtitle={'subtitle' in item ? item.subtitle : undefined}
                    value={'value' in item ? item.value : undefined}
                    badge={'badge' in item ? item.badge : undefined}
                  />
                  {index < profileMenuItems.length - 1 && <View style={styles.menuDivider} />}
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
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
  userCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginBottom: spacing.lg,
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerHighest,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.primary,
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.surfaceContainerLowest,
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  verifiedIcon: {
    marginTop: 2,
  },
  username: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tag: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    fontSize: 10,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.outlineVariant,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  sectionTitleWithIcon: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onSurface,
  },
  manageText: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
  },
  verifiedCountText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  filtersList: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerLow,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    fontWeight: typography.weights.medium,
  },
  filterTextActive: {
    color: colors.onPrimary,
    fontWeight: typography.weights.bold,
  },
  competitionsList: {
    gap: spacing.md,
  },
  referralBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  referralIconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  referralTextContainer: {
    flex: 1,
  },
  referralTitle: {
    fontSize: typography.sizes.sm,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  referralSubtitle: {
    fontSize: 11,
    fontFamily: typography.fontFamily,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  inviteBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  inviteBtnText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fontFamily,
    fontWeight: typography.weights.bold,
    color: colors.onPrimary,
  },
  settingsMenu: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    marginTop: spacing.xl,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginLeft: spacing['4xl'],
  },
});
