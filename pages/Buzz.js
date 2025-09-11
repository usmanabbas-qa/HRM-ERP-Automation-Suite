const { expect } = require('@playwright/test');
const { text } = require('stream/consumers');

class BuzzPage {
    constructor(page) {
        this.page = page;
        this.buzzTab = this.page.locator("[href*='viewBuzz']");
        this.assertBuzzPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
        this.postText = this.page.getByRole('textbox', { name: 'What\'s on your mind?' })
        this.postButton = this.page.getByRole('button', { name: 'Post', exact: true });
        this.saveSuccessToast = this.page.getByText('SuccessSuccessfully Saved×')
        this.latestPost = this.page.locator("div.oxd-text.oxd-text--p.oxd-post-text");
        this.sharePhoto = this.page.getByRole('button', { name: 'Share Photos' });
        this.shareButton = this.page.getByRole('button', { name: 'Share', exact: true });
        this.invalidFileTypeError = this.page.getByRole('alert').locator('div').filter({ hasText: 'Only \'gif\', \'png\', \'jpg\', \'' });
        this.likeButton = this.page.locator('#heart-svg').first();
        this.likeCount = this.page.locator('div').filter({ hasText: /^\d+ Like(s)?$/ }).first();
        this.commentIcon = this.page.locator('i.bi-chat-text-fill').first();
        this.commentBox = this.page.getByRole('textbox', { name: 'Write your comment...' });
        this.commentCount = this.page.locator('p.oxd-text.oxd-text--p.orangehrm-buzz-stats-active');
        this.actionButton = this.page.locator('li > .oxd-icon-button').first()
        this.deletePostButton = this.page.getByText('Delete Post', { exact: true });
        this.confirmDeleteButton = page.locator('button.oxd-button--label-danger', { hasText: 'Yes, Delete' });
        this.profileImage = page.locator('.orangehrm-buzz-post-header-details > .orangehrm-buzz-profile-image > img').first();
    }

    async clickBuzzTab() {
        await this.buzzTab.click();
    }
    async verifyBuzzPage() {
        await expect(this.assertBuzzPage).toHaveText('Buzz');
    }

    async enterPostText(text) {
        await this.postText.fill(text);
    }

    async clickPostButton() {
        await this.postButton.click();
    }

    async verifyPostTextCreated(text) {
        await expect(this.page.locator("div.oxd-text.oxd-text--p.oxd-post-text")).toHaveText(text);
    }

    async verifySuccessToast(successMessage) {
        await expect(this.saveSuccessToast).toBeVisible();
        await this.saveSuccessToast.waitFor({ state: "visible", timeout: 5000 });
        await expect(this.saveSuccessToast).toContainText(successMessage);
    }

    async checkLatestPost(text) {
        await expect(this.latestPost).toHaveText(text);
    }

    async clickSharePhotosButton() {
        await this.sharePhoto.click();
    }

    async uploadImageToPost(filePath) {
        await this.page.setInputFiles('input[type="file"]', filePath);
    }

    async clickShareButton() {
        await this.shareButton.click();
    }

    async verifyInvalidFileTypeError() {
        await expect(this.invalidFileTypeError).toBeVisible();
    }

    async clickLikeButton() {
        await this.likeButton.click();
    }

    async getLikeCount() {
        const text = await this.likeCount.textContent();
        const count = parseInt(text);
        return count;
    }

    async verifyLikeButtonFunctionality() {
        const countBefore = await this.getLikeCount();
        await this.likeButton.click();
        await this.page.waitForTimeout(1000);
        const countAfter = await this.getLikeCount();
        expect(countAfter).toBe(countBefore + 1);
    }

    async verifyDisLikeButtonFunctionality() {
        const countBefore = await this.getLikeCount();
        await this.likeButton.click();
        await this.page.waitForTimeout(1000);
        const countAfter = await this.getLikeCount();
        expect(countAfter).toBe(countBefore - 1);
    }

    async clickCommentIcon() {
        await this.commentIcon.click();
    }

    async clickCommentBox() {
        await this.commentBox.click();
    }

    async enterCommentText(text) {
        await this.commentBox.fill(text);
    }

    async submitComment() {
        await this.commentBox.press('Enter');
    }

    async getCommentCount() {
        return await this.commentCount.count();
    }

    async verifyRecentPost(text) {
        const postLocator = this.page.getByText(text, { exact: true }).first();
        await expect(postLocator).toBeVisible();
    }

    async getUserProfileImageSrc() {
        return this.page.getByRole('banner').getByRole('img', { name: 'profile picture' }).getAttribute('src');
    }

    async getPostProfileImageSrc() {
        return this.page.locator('.orangehrm-buzz-profile-image > img').first().getAttribute('src');
    }

    async getPostTimeStamp() {
        const timestampLocator = this.page.locator('.orangehrm-buzz-post-timestamp').first();
        const count = await this.page.locator('.orangehrm-buzz-post-timestamp').count();
        console.log('Timestamp elements found:', count);
        await expect(timestampLocator).toBeVisible({ timeout: 10000 });
        return timestampLocator.textContent();
    }

    async deleteLatestPost() {
        await this.actionButton.click();
        await this.deletePostButton.click();
        await this.confirmDeleteButton.click();
    }

    async profileImageVisible(){
        await this.profileImage.isVisible();
    }

    async posttimestamp() {
        await this.page.locator('.oxd-text oxd-text--p orangehrm-buzz-post-time').isVisible();
    }
}

module.exports = { BuzzPage }