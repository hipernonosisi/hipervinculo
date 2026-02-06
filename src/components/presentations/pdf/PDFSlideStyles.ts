import { StyleSheet } from '@react-pdf/renderer';

// Brand colors
export const colors = {
  darkGreen: '#2d4a2d',
  limeGreen: '#8BC34A',
  limeGreenLight: 'rgba(139, 195, 74, 0.15)',
  background: '#f8f9f5',
  white: '#ffffff',
  gray: '#6b7280',
  grayLight: '#e5e7eb',
};

// Base styles used across all PDF slides
export const baseStyles = StyleSheet.create({
  page: {
    width: 1920,
    height: 1080,
    backgroundColor: colors.background,
    padding: 64,
    fontFamily: 'Helvetica',
  },
  pageWhite: {
    width: 1920,
    height: 1080,
    backgroundColor: colors.white,
    padding: 64,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    height: 48,
  },
  accentBar: {
    width: 80,
    height: 6,
    backgroundColor: colors.limeGreen,
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  titleSmall: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  headline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.limeGreen,
    marginBottom: 24,
  },
  description: {
    fontSize: 24,
    color: colors.gray,
    lineHeight: 1.5,
    marginBottom: 24,
  },
  grid3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.darkGreen,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 18,
    color: colors.gray,
    lineHeight: 1.4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.limeGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.limeGreen,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 18,
    color: colors.darkGreen,
    textAlign: 'center',
    marginTop: 8,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  checkIcon: {
    width: 24,
    height: 24,
    color: colors.limeGreen,
  },
  checkText: {
    fontSize: 20,
    color: colors.gray,
  },
  phaseTag: {
    backgroundColor: colors.limeGreen,
    color: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 24,
  },
  column: {
    flex: 1,
  },
});
