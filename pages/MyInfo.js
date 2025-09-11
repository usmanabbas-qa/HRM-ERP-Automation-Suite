
const { expect } = require('@playwright/test');

class MyInfoPage {
    constructor(page) {
        this.page = page;
        this.myInfoTab = this.page.locator("[href*='viewMyDetails']");
        this.assertMyInfoPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
        this.dependentsTab = this.page.getByRole('link', { name: 'Dependents' });
        this.addButton = this.page.getByRole('button', { name: 'Add' }).first();
        this.addButtonForAttachment = this.page.getByRole('button', { name: 'Add' }).nth(1);
        this.name = this.page.locator('input.oxd-input.oxd-input--active').nth(0);
        this.dropDown = this.page.locator('i.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow');
        this.date = this.page.locator('i.oxd-icon.bi-calendar.oxd-date-input-icon');
        this.assertMyInfoPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
        this.myInfoInputField = this.page.locator(".oxd-input.oxd-input--active");
        this.myInfoLink = this.page.getByRole('link', { name: 'My Info' });
        this.dependentsLink = this.page.getByRole('link', { name: 'Dependents' });
        this.jobPageLink = this.page.getByRole('link', { name: 'Job' });
        this.addButton = this.page.getByRole('button', { name: ' Add' }).first();
        this.nameField = this.page.getByRole('textbox').nth(1);
        this.relationshipDropdown = this.page.locator('form i').first();
        this.dobDropdown = this.page.locator('form i').nth(1);
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.editButton = this.page.getByRole('button', { name: '' }).first();
        this.deleteButton = this.page.getByRole('button', { name: '' }).first();
        this.confirmDeleteButton = this.page.getByRole('button', { name: ' Yes, Delete' });
        this.usernameField = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordField = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.immigrationLink = this.page.getByRole('link', { name: 'Immigration' });
        this.addButton = this.page.getByRole('button', { name: ' Add' }).first();
        this.immigrationLink = this.page.getByRole('link', { name: 'Immigration' });
        this.passportNumber = this.page.locator('div:nth-child(2) > .oxd-input').first();
        this.eligibleStatus = this.page.locator('div:nth-child(4) > .oxd-input-group > div:nth-child(2) > .oxd-input');
        this.issuedBy = this.page.locator('form i').nth(2);
        this.comment = this.page.getByRole('textbox', { name: 'Type Comments here' });
        this.expiryDateErrorMsg = this.page.getByText('Expiry date should be after');
        this.jobDetailHeading = this.page.getByRole('heading', { name: 'Job Details' });
        this.joinDateLAble = this.page.getByText('Joined Date');
        this.jobTitleLabel = this.page.getByText('Job Title');
        this.salaryTab = this.page.locator("[href*='viewSalaryList']");
        this.qualificationTab = this.page.locator("[href*='viewQualifications']");
        this.membershipTab = this.page.locator("[href*='viewMemberships']");
        this.addExperienceTab = this.page.locator('.oxd-button').first();
        this.companyNameinput = this.page.locator('form').getByRole('textbox').first();
        this.jobTitleInput = this.page.locator('form').getByRole('textbox').nth(1);
        this.addEducationTab = this.page.locator('.oxd-button').nth(1);
        this.addSkillTab = this.page.locator('.oxd-button').nth(2);
        this.addLanguageTab = this.page.locator('.oxd-button').nth(3);
        this.educationLevelDropdown = this.page.locator('form i').first();
        this.languageDropdown = this.page.locator('form i').first();
        this.fluencyDropdown = this.page.locator('form i').nth(1);
        this.CompetencyDropdown = this.page.locator('form i').nth(2);
        this.membershipDropdown = this.page.locator('form i').first();
        this.assertMyInfoPage = this.page.locator(".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module")
        this.employeeImage = this.page.getByRole('img', { name: 'profile picture' }).nth(1);
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.errorMessage = this.page.getByText('File type not allowed');
        this.contactDetailsLink = this.page.getByRole('link', { name: 'Contact Details' });
        this.workEmailField = this.page.locator('.oxd-input.oxd-input--focus');
        this.street1Field = this.page.locator('.oxd-input.oxd-input--active').nth(0);
        this.street2Field = this.page.locator('.oxd-input.oxd-input--active').nth(1);
        this.cityField = this.page.locator('.oxd-input.oxd-input--active').nth(2);
        this.stateField = this.page.locator('.oxd-input.oxd-input--active').nth(3);
        this.zipCodeField = this.page.locator('.oxd-input.oxd-input--active').nth(4);
        this.countryDropdown = this.page.locator('form i');
        this.fieldErrorMessage = this.page.locator(".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message");
        this.deleteIcon = page.locator('i.oxd-icon.bi-trash');
        this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
        this.workEmailInputField = this.page.locator('div:nth-child(9) > .oxd-grid-3 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').first();
    }

    async clickOnMembershipTab() {
        await this.membershipTab.click();
    }

    async clickOnAddSkkillButton() {
        await this.addSkillTab.click();
    }

    async clickOnAttachmentTab() {
        await this.addButtonForAttachment.click();
    }

    async clickOnLanguageTab() {
        await this.addLanguageTab.click();
    }

    async clickMyInfoTab() {
        await this.myInfoTab.click();
    }
    async verifyMyInfoPage() {
        await expect(this.assertMyInfoPage).toHaveText('PIM');
    }

    async enterDataMyInfo(index, data) {
        const inputField = await this.myInfoInputField.nth(index);
        await inputField.fill(data);
    }

    async navigateToDependents() {
        await this.dependentsTab.click();
    }

    async clickOnAddButton() {
        await this.addButton.click();
    }

    async navigateToJobPage() {
        await this.jobPageLink.click();
    }

    async openDependents() {
        await this.myInfoLink.click();
        await this.dependentsLink.click();
    }

    async addDependent(name, relationship, dateString) {
        await this.addButton.click();
        await this.nameField.fill(name);
        await this.relationshipDropdown.click();
        await this.page.getByRole('option', { name: relationship }).click();
        await this.selectDateOfBirth(dateString); // call directly
        await this.saveButton.click();
    }
    async editDependent(relationship, description) {
        await this.editButton.click();
        await this.relationshipDropdown.click();
        await this.page.getByRole('option', { name: relationship }).click();
        await this.page.getByRole('textbox').nth(2).fill(description);
        await this.saveButton.click();
    }

    async deleteDependent() {
        await this.deleteButton.click();
        await this.confirmDeleteButton.click();
    }

    async selectDateOfBirth(dateString) {
        const [year, month, day] = dateString.split('-');

        // Open date picker
        await this.page.locator('form i').nth(1).click();

        // Click year dropdown
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-year').click();

        // Select year
        await this.page.getByText(year, { exact: true }).click();

        // Click month dropdown (so month list appears)
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-month').click();

        // Month names array
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Select month
        await this.page.getByText(monthNames[parseInt(month) - 1], { exact: true }).click();

        // Select day
        await this.page.getByText(day.replace(/^0/, ''), { exact: true }).click();
    }
    async clickSave() {
        await this.saveButton.click();
    }

    async clickEdit() {
        await this.editButton.click();
    }

    async clickDelete() {
        await this.deleteButton.click();
        await this.confirmDeleteButton.click();
    }

    async selectDate(fieldIndex, dateString) {
        const [year, month, day] = dateString.split('-');
        await this.page.locator('form i').nth(fieldIndex).click();
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-year').click();
        await this.page.getByText(year, { exact: true }).click();
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-month').click();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        await this.page.getByText(monthNames[parseInt(month) - 1], { exact: true }).click();
        await this.page.getByText(day.replace(/^0/, ''), { exact: true }).click();
    }

    async enterPassportNumber(passportNumber) {
        await this.passportNumber.fill(passportNumber);
    }

    async enterEligibleStatus(status) {
        await this.eligibleStatus.fill(status);
    }

    async selectNationality(nationality) {
        await this.issuedBy.click();
        await this.page
            .locator('.oxd-select-dropdown')
            .getByRole('option', { name: nationality, exact: true })
            .click();
    }

    async enterComment(comment) {
        await this.comment.fill(comment);
    }

    async navigateToImmigration() {
        await this.immigrationLink.click();
    }

    async expiryDateErrorMsgDisplay() {
        await expect(this.expiryDateErrorMsg).toBeVisible();
    }

    async assertJobDetails() {
        await expect(this.jobDetailHeading).toBeVisible();
    }
    async assertJoinDate() {
        await expect(this.joinDateLAble).toBeVisible();
    }
    async assertJobTitle() {
        await expect(this.jobTitleLabel).toBeVisible();
    }

    async clickSalaryTab() {
        await this.salaryTab.click();
    }

    async clickQualificationTab() {
        await this.qualificationTab.click();
    }

    async clickAddExperienceTab() {
        await this.addExperienceTab.click();
    }

    async fillExperienceDetails(companyName, jobTitle) {
        await this.companyNameinput.fill(companyName);
        await this.jobTitleInput.fill(jobTitle);
    }

    async clickAddEducationTab() {
        await this.addEducationTab.click();
    }

    async selectEducationLevel(level) {
        await this.educationLevelDropdown.click();
        await this.page.locator(`text=${level}`).click();
    }

    async addLanguage(language, fluency, competency) {
        await this.languageDropdown.click();
        await this.page.getByRole('option', { name: language }).click();
        await this.fluencyDropdown.click();
        await this.page.getByRole('option', { name: fluency }).click();
        await this.CompetencyDropdown.click();
        await this.page.getByRole('option', { name: competency }).click();
    }

    async clickonEmployeeImage() {
        await this.employeeImage.click();
    }

    async uploadInvalidFile(filePath) {
        const path = require('path');
        const resolvedPath = path.resolve(__dirname, '../test-data/', filePath);
        await this.page.setInputFiles('input[type="file"]', resolvedPath);
    }

    async clickOnSaveButton() {
        await this.saveButton.click();
    }

    async errorOnInvalidFileUpload() {
        await expect(this.errorMessage).toBeVisible();
    }

    async uploadFileError(error) {
        const isVisible = await this.page.getByText(error).isVisible();
        return isVisible;
    }

    async navigateToContactDetails() {
        await this.contactDetailsLink.click();
    }

    async enterWorkEmail(email) {
        await this.workEmailField.fill(email);
    }

    async enterAddress(street1, street2, city, state, zipCode, country) {
        await this.street1Field.fill(street1);
        await this.street2Field.fill(street2);
        await this.cityField.fill(city);
        await this.stateField.fill(state);
        await this.zipCodeField.fill(zipCode);
        await this.countryDropdown.click();
        await this.countryDropdown.getByRole('option', { name: country });
    }

    async clickNavbarItem(value) {
        await this.page.getByRole('link', { name: value }).click();
    }

    async enterInputByIndex(index, text) {
        await this.page.locator(`(//input[@class='oxd-input oxd-input--active'])[${index}]`).fill(text);
    }

    async invalidEmailError() {
        await expect(this.page.getByText('Expected format: admin@')).toBeVisible();
    }

    async clicEmergencyContactAddButton() {
        await this.page.getByRole('button', { name: ' Add' }).first().click();
    }

    async verifyFieldMissingError() {
        await expect(this.fieldErrorMessage).toBeVisible();
    }

    async editDetails(option_text) {
        await this.page.getByText('-- Select --').nth(1).click();
        await this.page.getByText(option_text).click();
    }

    async editGenderDetails(gender) {
        await this.page.getByText(gender, { exact: true }).click();
    }

    async deleteAttachment(index) {
        await this.deleteIcon.nth(index).click();
        await this.confirmDeleteButton.click();
    }

    async clicksaveButton() {
        await this.page.getByText(' Save ', { exact: true }).click();
    }

    async clickCancelButtonOnEC() {
        await this.page.getByRole('link', { name: 'Emergency Contacts' }).click();
        await this.page.getByRole('button', { name: ' Add' }).first().click();
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async clearingCookie() {
        const start = Date.now();
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/7');
        const end = Date.now();
        console.log(`Page loaded in ${end - start} ms`);
    }

    async checkValidation(name) {
        await this.page.locator('form').getByRole('textbox').first().click();
        await this.page.locator('form').getByRole('textbox').first().fill(name)
    }

    async dropDownFunctionality() {
        await this.page.getByText('-- Select --').first().click();
        await this.page.getByText('-- Select --').nth(1).click();
    }

    async selectMembership(level) {
        await this.membershipDropdown.click();
        await this.page.locator(`text=${level}`).click();
    }

    async enterWorkEmailInput(email) {
        await this.workEmailInputField.fill(email);
    }

    async verifySuccessMessage() {
        await this.page.getByText('SuccessSuccessfully Updated×').isVisible();
    }

    async fileExceededError() {
        await this.page.getByText('Attachment Size Exceeded').isVisible();
    }

    async selectDate1(fieldIndex, dateString) {
        const [year, month, day] = dateString.split('-');
        await this.page.locator('form i').nth(fieldIndex).click();
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-year').click();
        await this.page
            .locator('.oxd-calendar-dropdown--option')
            .getByText(year, { exact: true })
            .click();
        await this.page.locator('.oxd-date-input-calendar .oxd-calendar-selector-month').click();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        await this.page
            .locator('.oxd-calendar-dropdown--option')
            .getByText(monthNames[parseInt(month) - 1], { exact: true })
            .click();
        await this.page
            .locator('.oxd-calendar-date')
            .getByText(day.replace(/^0/, ''), { exact: true })
            .click();
    }

    async uploadvalidFile(filePath) {
        const path = require('path');
        const resolvedPath = path.resolve(__dirname, '../test-data/', filePath);
        await this.page.setInputFiles('input[type="file"]', resolvedPath);
    }
  
    async salaryComponent(compunent) {
        await this.page.getByRole('textbox').nth(1).fill(compunent);
    }

    async currencyDropdown(country) {
        await this.page.getByText('-- Select --').nth(2).click();
        await this.page.getByText(country).nth(2).click();
    }
    async enterAmount(num) {
        await this.page.getByRole('textbox').nth(2).fill(num);
    }

    async selectCurrency(text){
        await this.page.locator('form i').nth(2).click();
        await this.page.getByRole('option', { name: text}).click();
    }

    async errorOnNegativeAmount() {
        await this.page.getByText('Should be a number').isVisible();
    }

    async selectNavbarItem(text){
        await this.page.getByRole('link', { name: text }).click();
    }

      async assignedSupervisorVisible(){
        await this.page.locator('div').filter({ hasText: /^No Records Found$/ }).nth(1).isVisible();
    }
 
    async assignedSubordinatesVisible(){
        await this.page.getByRole('row', { name: 'Sara Tencrady Direct' }).isVisible();
        console.log("Sara Tencrady Direct");
    }

    async addAssignedSupervisor(){
        await this.page.locator('div').filter({ hasText: /^Assigned Supervisors Add No Records FoundNameReporting MethodActions$/ }).getByRole('button').click();
    }
 
    async enterName(text){
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(text);
        await this.page.getByRole('option', { name: text }).first().click();
    }
 
    async selectReportingTo(){
        await this.page.locator('form i').click();
        await this.page.getByText('Indirect').click();
    }
}

module.exports = { MyInfoPage }