const { expect } = require('@playwright/test');
const { ECDH } = require('crypto');

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.welcomeMessage = this.page.locator("img[alt='client brand banner']");
        this.upgradeButton = this.page.locator('a.orangehrm-upgrade-link');
        this.usersDropdownTab = this.page.locator('.oxd-userdropdown-tab');
        this.logoutOption = this.page.locator('a.oxd-userdropdown-link', {hasText: 'Logout'});
        this.helpIcon = this.page.locator('button[title="Help"]');
        this.buzzPage = this.page.locator('a:has-text("Buzz")');
        this.assignLeaveLink = this.page.getByRole('button', {name: 'Assign Leave'});
        this.leaveListLink = this.page.getByRole('button', {name: 'Leave List'});
        this.timesheetLink = this.page.getByRole('button', {name: 'Timesheets'});
        this.title = page.getByRole('heading', {name: 'Dashboard', level: 6});
        this.leaveLink = page.locator('[href*="/web/index.php/leave/viewLeaveModule"]');
        this.applyLeave = page.getByRole('link', {name: 'Apply'});
        this.myLeave = page.getByRole('link', {name: 'My Leave'});
        this.timeSheet = page.locator('[href*="/web/index.php/time/viewTimeModule"]');
        this.myTimeSheet = page.getByRole('heading', {name: '/ Timesheets'});
        this.buzz = page.locator('[href*="/web/index.php/buzz/viewBuzz"]');
        this.recentpost = page.locator('.oxd-button.oxd-button--medium.oxd-button--label-warn.orangehrm-post-filters-button')
        this.searchField = this.page.locator("input[placeholder='Search']");
        this.assertSearchInput = this.page.locator(".oxd-main-menu-item");
        this.activeMenu = this.page.locator(".oxd-main-menu-item.active");
        this.pageHeading = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
        this.widgetSettingsIcon = this.page.locator(".oxd-icon.bi-gear-fill.orangehrm-leave-card-icon");
        this.widgetSettingsMenu = this.page.locator(".oxd-input-group.oxd-input-field-bottom-space");
        this.pieChart = page.locator("body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(6) > div:nth-child(1)");
        this.pieChartHeading = this.page.locator("//p[normalize-space()='Employee Distribution by Sub Unit']");
        this.pendingSelfReviewLink = this.page.locator("//p[normalize-space()='(1) Pending Self Review']");
        this.myActionsWidget = this.page.locator("(//div[@class='orangehrm-dashboard-widget-header'])[2]");
        this.candidateInterviewLink = this.page.locator("//p[normalize-space()='(1) Candidate to Interview']");
        this.usersDropdownTab = this.page.locator('.oxd-userdropdown-tab');
        this.logoutOption = this.page.locator('a.oxd-userdropdown-link', {hasText: 'Logout'});
        this.helpIcon = this.page.locator('button[title="Help"]');
        this.avatorOnWidget = this.page.locator("img[alt='profile picture']");
        this.widgetTitle = this.page.locator('.oxd-text.oxd-text--p', {hasText: 'Employees on Leave Today'});
        this.noLeaveMessage = this.page.locator('.oxd-text.oxd-text--p', {hasText: 'No Employees are on Leave Today'});
        this.leaveWidgetTitle = this.page.locator('.orangehrm-dashboard-widget-header .orangehrm-dashboard-widget-name >> text=Employees on Leave Today');
    }

    async verifyWelcomeMessage() {
        await expect(this.welcomeMessage).toBeVisible();
    }

    async verifyUpgradeFunctionality() {
        await this.upgradeButton.click();
    }

    async verifyUsersDropdownTab() {
        await this.usersDropdownTab.click();
    }

    async verifyLogout() {
        await this.logoutOption.click();
    }

    async verifyHelpIcon() {
        await this.helpIcon.click();
    }

    async navigateToBuzzPage() {
        await this.buzzPage.click();
        await expect(this.page).toHaveURL(/.*buzz/);
    }

    async clickSearchField() {
        await this.searchField.click();
    }

    async typeInSearchField(value) {
        await this.searchField.fill(value);
    }

    async verifySearchInput(expectedText) {
        await expect(this.assertSearchInput).toContainText(expectedText);
    }

    menuItems(menuName) {
        return this.page.locator('span.oxd-main-menu-item--name', {hasText: menuName});
    }

    async clickMenuItem(menuName) {
        await this.menuItems(menuName).click();
    }

    async verifyMenuItemIsActive(menuName) {
        await expect(this.activeMenu).toHaveText(menuName);
    }

    async verifyPageHeading(expectedHeading) {
        await expect(this.pageHeading).toHaveText(expectedHeading);
    }

    async clickWidgetSettingsIcon() {
        await expect(this.widgetSettingsIcon).toBeVisible();
        await this.widgetSettingsIcon.click();
    }

    async navigateToAssignLeave() {
        await this.assignLeaveLink.click();
        await expect(this.page).toHaveURL(/.*assignLeave/);
    }

    async navigateToLeaveList() {
        await this.leaveListLink.click();
        await expect(this.page).toHaveURL(/.*viewLeaveList/);
    }

    async navigateToTimesheet() {
        await this.timesheetLink.click();
        await expect(this.page).toHaveURL(/.*viewEmployeeTimesheet/);
    }

    async verifyAndAssertTitle() {
        await expect(this.title).toBeVisible();
        await expect(this.title).toHaveText('Dashboard');
    }

    async navigateToLeave() {
        await this.leaveLink.click();
    }

    async navigateToApplyLeave() {
        await this.applyLeave.click();
    }

    async navigateToMyLeave() {
        await this.myLeave.click();
    }

    async navigateToTimeSheet() {
        await this.timeSheet.click();
        await expect(this.timeSheet).toBeVisible();
        await expect(this.timeSheet).toHaveText('Time');
    }

    async navigateToMyTimeSheet() {
        await this.myTimeSheet.click();
        await expect(this.myTimeSheet).toBeVisible();
        await expect(this.myTimeSheet).toHaveText('Timesheets');
    }

    async navigateToBuzz() {
        await this.buzz.click();
        await expect(this.buzz).toBeVisible();
        await expect(this.buzz).toHaveText('Buzz');
    }

    async navigateToRecentPost() {
        await this.recentpost.click();
        await expect(this.recentpost).toBeVisible();
    }

    async verifySettingsMenuVisible() {
        await expect(this.widgetSettingsMenu).toBeVisible();
    }

    async verifyPieChartVisible() {
        await expect(this.pieChartHeading).toBeVisible();
        await expect(this.pieChart).toBeVisible();
    }

    async handlePendingSelfReview() {
        await expect(this.myActionsWidget).toBeVisible();

        const isVisible = await this.pendingSelfReviewLink.isVisible();
        if (isVisible) {
            await this.pendingSelfReviewLink.click();
            await this.verifySelfReviewPage();
        } else {
            console.log("No Pending Self Review link is visible for this user.");
        }
    }

    async verifySelfReviewPage() {
        await expect(this.page).toHaveURL(/.*\/performance\/myPerformanceReview/);
    }

    async handleCandidateInterviewLink() {
        await expect(this.myActionsWidget).toBeVisible();

        const isVisible = await this.candidateInterviewLink.isVisible();
        if (isVisible) {
            await this.candidateInterviewLink.click();
            await this.verifyCandidateInterviewPage();
        } else {
            console.log("No 'Candidate to Interview' link is visible for this user.");
        }
    }

    async verifyCandidateInterviewPage() {
        await expect(this.page).toHaveURL(/.*\/recruitment\/viewCandidates\?statusId=4/);
        await expect(this.page.locator("a.oxd-topbar-body-nav-tab-item", { hasText: "Candidates" })).toBeVisible();
    }


    async verifyAvatorOnWidget() {
        await expect(this.avatorOnWidget).toBeVisible();
    }

    async verifyWidgetTitle() {
        await expect(this.widgetTitle).toBeVisible();
    }

    async verifyEmployeeLeave() {
        await expect(this.widgetTitle).toBeVisible();

        if (await this.noLeaveMessage.isVisible()) {
            console.log('No employees are on leave today.');
        } else {
            console.log('Some employees are on leave today.');
        }
        }

        async visibilityOfLeaveWidgetTitle(){
            await expect(this.leaveWidgetTitle).toBeVisible();
        }
}

module.exports = { DashboardPage };