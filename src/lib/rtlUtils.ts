/**
 * Utility functions for handling RTL (Right-to-Left) text and Arabic language
 */

/**
 * Checks if the text contains RTL characters (primarily Arabic or Hebrew)
 * @param text Text to check
 * @returns true if text contains RTL characters
 */
export function isRTL(text: string): boolean {
    if (!text) return false;

    // Arabic character range: \u0600-\u06FF
    // Hebrew character range: \u0590-\u05FF
    // Additional Arabic presentation forms: \u0750-\u077F, \uFB50-\uFDFF, \uFE70-\uFEFF
    const rtlRegex = /[\u0600-\u06FF\u0590-\u05FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

    return rtlRegex.test(text);
}

/**
 * Gets the appropriate text direction based on content
 * @param text Text to analyze
 * @returns 'rtl' if text is primarily RTL, 'ltr' otherwise
 */
export function getTextDirection(text: string): 'rtl' | 'ltr' {
    return isRTL(text) ? 'rtl' : 'ltr';
}

/**
 * Normalizes Arabic text for better search
 * - Normalizes different forms of Alef, Yaa, etc.
 * - Removes diacritics (tashkeel)
 * @param text Text to normalize
 * @returns Normalized text
 */
export function normalizeArabicText(text: string): string {
    if (!text) return '';

    return text
        // Normalize Alef forms to Alef (ا)
        .replace(/[أإآ]/g, 'ا')
        // Normalize Yaa forms (ي/ى)
        .replace(/[ىي]/g, 'ي')
        // Normalize Taa Marbuta to Haa (ة to ه)
        .replace(/ة/g, 'ه')
        // Remove Tatweel (kashida)
        .replace(/ـ/g, '')
        // Remove Tashkeel (diacritics)
        .replace(/[\u064B-\u065F]/g, '');
}

/**
 * Prepares text for fuzzy search by normalizing and cleaning
 * @param text Text to prepare
 * @returns Prepared text
 */
export function prepareTextForSearch(text: string): string {
    if (!text) return '';

    // Check if text contains Arabic
    if (isRTL(text)) {
        return normalizeArabicText(text);
    }

    // For non-Arabic text, just lowercase and trim
    return text.toLowerCase().trim();
}
