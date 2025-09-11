const { expect } = require("@playwright/test");
const { text } = require("stream/consumers");

class AdminOrganizationPage {
  constructor(page) {
    this.page = page;
    this.organizationDropDown = this.page.locator(
      'span.oxd-topbar-body-nav-tab-item:has-text("Organization")'
    );
    this.organizationName = page.locator(".oxd-label.oxd-input-field-required");
    this.employeeCountText = page.locator("p.no-of-employees-value");
    //this.registrationNumber = page.locator('div.oxd-grid-item:has(label:text("Registration Number")) input');
    this.taxIdField = this.page.locator(
      'div.oxd-grid-item:has(label:text("Tax ID")) input'
    );
    this.editToggleOnADminOrg = this.page.locator('input[type="checkbox"]');
    this.phone = this.page.locator("input[modelmodifiers='[object Object]']");
    this.fax = this.page.locator('input[name="fax"]');
    this.email = this.page.locator('input[placeholder="Email"]');
    this.generalInfoEditToggle = page.locator(
      ".oxd-switch-input.oxd-switch-input--active.--label-left"
    );
    this.phoneField = page.locator("input[modelmodifiers='[object Object]']");
    this.faxField = page.locator(
      "(//input[@class='oxd-input oxd-input--active'])[6]"
    );
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.organizationLocationField = page.locator(
      "div[class='oxd-grid-3 orangehrm-full-width-grid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) input:nth-child(1)"
    );
    this.locationSearchButton = page.getByRole("button", { name: "Search" });
    this.recordFound = page.locator(
      "//span[normalize-space()='(1) Record Found']"
    );
    this.locationCity = page.locator(
      "(//input[@class='oxd-input oxd-input--active'])[3]"
    );
    this.noRecordFound = page.locator(
      "//span[normalize-space()='No Records Found']"
    );
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.noOfEmployee = page.locator(".no-of-employees-value");
    this.successToast = page.locator(".oxd-toast-content");
    this.registrationNumber = page.getByRole("textbox", { name: "Search" });
    this.editToggleOnADminOrg = this.page.locator('input[type="checkbox"]');
    this.editOrganizationName = this.page.locator("input.oxd-input").nth(0);
    this.editAddress1Field = this.page
      .locator(".oxd-input.oxd-input--active")
      .nth(2);
    this.editAddress2Field = this.page
      .locator(".oxd-input.oxd-input--active")
      .nth(3);
    this.editCityField = this.page
      .locator(".oxd-input.oxd-input--active")
      .nth(4);
    this.editState = this.page.locator(".oxd-input.oxd-input--active").nth(5);
    this.editZip = this.page.locator(".oxd-input.oxd-input--active").nth(6);
    this.editemailField = this.page
      .locator(".oxd-input.oxd-input--active")
      .nth(7);
    this.countryDropdownOption = (country) =>
      this.page.locator(`div[role="listbox"] >> text=${country}`);
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.editNoteField = this.page.locator(
      ".oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical"
    );
    this.phoneField = page.locator("input[modelmodifiers='[object Object]']");
    this.faxField = page.locator(
      "(//input[@class='oxd-input oxd-input--active'])[6]"
    );
    this.errorMessage = this.page.locator("span.oxd-input-field-error-message");
    this.editLocation = page.locator("button:has(i.bi-pencil-fill)").nth(0);
    this.recordsFoundLabel = this.page.getByText(/\(\d+\) Records Found/);
    this.addLocationButton = page.getByRole("button", { name: "Add" });
    this.nameFieldOnSearch = this.page.getByRole("textbox").nth(1);
    this.cityFieldOnSearch = this.page.getByRole("textbox").nth(2);
    this.resetBtn = page.getByRole("button", { name: "reset" });
    this.countryFieldOnSearch = this.page.locator(".oxd-select-text");
    this.submitButtonOnSearch = this.page.getByRole("button", {
      name: "Search",
    });
    this.rowCards = page.locator(".oxd-table-card");
    this.deleteButton = page.locator('i.oxd-icon.bi-trash');
    this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
    this.toastMessage = page.locator(".oxd-toast-content");
    this.topLevelNode = page.locator('.oxd-text.oxd-text--p.--parent')
    this.hierarchicalStucture = page.locator(".oxd-tree-view");
    this.nodeByName = (name) => this.page.locator('.org-name', { hasText: name });
    this.editIcon = this.page.locator('.oxd-icon.bi-pencil-fill');
    this.addPlusIcon = this.page.locator('.oxd-icon.bi-plus');
    this.orgActionClass = this.page.locator('.org-action');
    this.addOrganization = this.page.getByRole("button", { name: "Add" });
    this.enterOrganizationName = this.page.getByRole('textbox').nth(2);
    this.inputFields = this.page.locator('.oxd-input.oxd-input');
    this.structureDeleteButton = this.page.getByRole('listitem').filter({ hasText: /^IT$/ }).getByRole('button').first()
    this.success = this.page.getByText('Success', { exact: true });
  }

  async deleteLocationByIndex(index = 0) {
    const row = this.rowCards.nth(index);
    const checkbox = row.locator(".oxd-checkbox-wrapper");
    await checkbox.click();
    const deleteIcon = row.locator("i.oxd-icon.bi-trash");
    await deleteIcon.click();
    await this.confirmDeleteButton.click();
    await expect(this.toastMessage).toContainText("Successfully Deleted");
  }

  async multipleDeleteByIndexes(indexes = []) {
    // Select multiple rows by index
    for (const index of indexes) {
        const row = this.rowCards.nth(index);
        const checkbox = row.locator(".oxd-checkbox-wrapper");
        await checkbox.click();
    }
    const deleteSelectedBtn = this.page.getByRole("button", { name: " Delete Selected" });
    await deleteSelectedBtn.click();
    
    await this.confirmDeleteButton.click();
    
    await expect(this.toastMessage).toContainText("Successfully Deleted");
  }

  async selectDropDownItem(itemText) {
    await this.page.click(`ul.oxd-dropdown-menu >> text="${itemText}"`);
  }

  async clickTopMenu(menuItemText) {
    await this.page
      .locator(`nav[role='navigation'] li:has-text("${menuItemText}")`)
      .click();
  }

  async enterName() {
    await this.nameFieldOnSearch.fill("test");
  }

  async enterCity() {
    await this.cityFieldOnSearch.fill("test");
  }

  async clickResetBtn() {
    await this.resetBtn.click();
  }

  async clickOrganization() {
    await this.organizationDropDown.click();
  }

  async verifyOrganizationName() {
    await expect(this.organizationName).toBeVisible();
  }

  async getEmployeeCount() {
    const countText = await this.employeeCountText.textContent();
    const count = parseInt(countText.trim(), 10);
    return count;
  }

  async verifyRegistrationNumberIsDisplayed() {
    await expect(this.registrationNumber).toBeVisible();
  }

  async verifyTaxIdValue() {
    await this.editToggleOnADminOrg.click();
    const taxIdValue = await this.taxIdField.inputValue();
    const taxID = parseInt(taxIdValue.trim(), 10);
    return taxID;
  }

  async verifyContactFields() {
    await this.editToggleOnADminOrg.click();
    const phoneValue = await this.phone.inputValue();
    const phoneNo = parseInt(phoneValue.trim(), 10);

    const faxValue = await this.fax.inputValue();
    const faxNo = parseInt(faxValue.trim(), 10);
    return phoneNo, faxNo;
  }

  async clickEditToggle() {
    await this.generalInfoEditToggle.click();
  }

  async clickAndEnterPhoneNum(value) {
    await this.phoneField.fill(value);
  }

  async clickAndEnterFaxNum(num) {
    await this.faxField.fill(num);
  }

  async clickSaveButton() {
    await this.saveButton.click();
  }

  async EnterLocationName(value) {
    await this.organizationLocationField.fill(value);
  }

  async clickSearchButton() {
    await this.locationSearchButton.click();
  }

  async EnterLocationCity(value) {
    await this.locationCity.fill(value);
  }

  async getRecordCount() {
    const text = await this.recordFound.textContent().catch(() => null);
    const match = text?.match(/\d+/);
    const count = match ? +match[0] : 0;

    if (count > 0) {
      console.log(`Record count found: ${count}`);
    } else {
      console.log("No Records Found");
    }

    return count;
  }

  async isNoRecordFoundVisible() {
    await this.noRecordFound.isVisible();
  }

  async verifyFieldVisibilityByLabel(labelText) {
    const labelLocator = this.page.locator(
      `.oxd-input-group:has-text("${labelText}")`
    );
    await expect(labelLocator).toBeVisible();
    console.log(`Label "${labelText}" is visible.`);
    let fieldLocator;
    if (labelText === "Country") {
      fieldLocator = this.page.locator("div.oxd-select-text-input");
    } else {
      fieldLocator = labelLocator.locator(
        "input[disabled], textarea[disabled]"
      );
    }
    await expect(fieldLocator).toBeVisible();
  }

  async verifyNoOfEmployee() {
    await expect(this.noOfEmployee).toBeVisible();
  }

  async verifySuccessToast() {
    await expect(this.successToast).toBeVisible();
    await this.successToast.waitFor({ state: "visible", timeout: 5000 });
    await expect(this.successToast).toContainText("Success");
  }

  async fillRegistrationNumber(RegistrationNumber) {
    await this.registrationNumber.fill(RegistrationNumber);
  }

  async editFieldByLabel(labelText, data) {
    const fieldLocator = this.page.locator(
      `.oxd-input-group:has-text("${labelText}") input`
    );
    await expect(fieldLocator).toBeEditable();
    console.log(`Field with label "${labelText}" is Editable.`);
    await fieldLocator.fill(data);
    console.log("data:", data);
  }

  async verifyUpdatingAddressInformation() {
    await this.editToggleOnADminOrg.check();
    await this.editAddress1Field.fill("123 Main St");
    await this.editAddress2Field.fill("Anytown");
    await this.editCityField.fill("New York");
    await this.editState.fill("NA");
    await this.editZip.fill("855");
    await this.page.locator("div.oxd-select-text-input").click();
    await this.countryDropdownOption("Benin").click();
    await this.saveButton.click();
  }
  async verifyUpdatingNoteField() {
    await this.editToggleOnADminOrg.check();
    await this.editNoteField.fill("Hi there");
    await this.saveButton.click();
  }

  async enableEditMode() {
    await this.editToggleOnADminOrg.click();
  }

  async fillBasicOrgDetails(orgName, phone, fax, email) {
    await this.editOrganizationName.fill(orgName);
    await this.phoneField.fill(phone);
    await this.faxField.fill(fax);
    await this.editemailField.fill(email);
  }

  async fillAddressDetails(address1, address2, city, state, zip) {
    await this.editAddress1Field.fill(address1);
    await this.editAddress2Field.fill(address2);
    await this.editCityField.fill(city);
    await this.editState.fill(state);
    await this.editZip.fill(zip);
  }

  async selectCountry(country) {
    await this.page.locator("div.oxd-select-text-input").click();
    await this.page.locator('div[role="option"]', { hasText: country }).click();
  }

  async selectCountry(country) {
    await this.page.locator("div.oxd-select-text-input").click();
    await this.page.locator(`div[role="option"] >> text="${country}"`).click();
  }

  async verifyErrorMessage() {
    await expect(this.errorMessage).toHaveText(
      /Required|Expected format: admin@example\.com/
    );
  }
  async clickEditLocation() {
    await this.editLocation.click();
  }

  async clickAddButtonOnLocationPage() {
    await expect(this.addLocationButton).toBeVisible();
    await this.addLocationButton.click();
    await expect(this.page).toHaveURL(/.*saveLocation/);
    console.log(
      "Verify the Add button is present, clickable, and opens the form for adding a new location"
    );
  }

  async verifyRecordsFoundLabel() {
    await expect(this.recordsFoundLabel).toBeVisible();
  }

  async verifyLocationSearchFunctionality(name, city, country) {
    await this.nameFieldOnSearch.fill(name);
    await this.cityFieldOnSearch.fill(city);
    await this.countryFieldOnSearch.click();
    await this.page.locator(".oxd-select-option >> text=" + country).click();
    await this.submitButtonOnSearch.click();
  }

  async verifyTopLevelNodeText() {
    const textTopNode = await this.topLevelNode.textContent();
    console.log('node text', textTopNode);
    await expect(this.topLevelNode).toHaveText(textTopNode)
  }

  async verifyOrgNodeVisible(name) {
    await expect(this.nodeByName(name)).toBeVisible();
  }

  async clickToggle_Engineering() {
    const toggle = this.page.locator("(//button[@role='none'])[2]");
    if (await toggle.isVisible()) {
      await toggle.click();
      console.log("Clicked Engineering toggle");
    } else {
      console.warn("Engineering toggle not visible");
    }
  }

  async clickToggle_SalesAndMarketing() {
    const toggle = this.page.locator("(//button[@role='none'])[3]");
    if (await toggle.isVisible()) {
      await toggle.click();
      console.log("Clicked Sales & Marketing toggle");
    } else {
      console.warn("Sales & Marketing toggle not visible");
    }
  }

  async clickToggle_ClientServices() {
    const toggle = this.page.locator("(//button[@role='none'])[4]");
    if (await toggle.isVisible()) {
      await toggle.click();
      console.log("Clicked Client Services toggle");
    } else {
      console.warn("Client Services toggle not visible");
    }
  }

  async verifyEngineeringChildNodes(expectedChildNames) {
    const parentNode = this.page.locator('li.oxd-tree-node', {
      has: this.page.locator('.org-name', { hasText: 'Engineering' }),
    });

    const childNodesContainer = parentNode.locator('ul.oxd-tree-node-child');

    for (const childName of expectedChildNames) {
      const childNode = childNodesContainer.locator('.org-name', { hasText: childName });
      await expect(childNode, `Child node "${childName}" should be visible under Engineering`).toBeVisible();
    }
  }

  async verifyClientServicesChildNodes(expectedChildNames) {
    const parentNode = this.page.locator('li.oxd-tree-node', {
      has: this.page.locator('.org-name', { hasText: 'Client Services' }),
    });

    const childNodesContainer = parentNode.locator('ul.oxd-tree-node-child');

    for (const childName of expectedChildNames) {
      const childNode = childNodesContainer.locator('.org-name', { hasText: childName });
      await expect(childNode, `Child node "${childName}" should be visible under Client Services`).toBeVisible();
    }
  }

  async verifyEditModeEnabled() {
    await expect(this.orgActionClass.first()).toBeVisible();
  }

  async AddNewOrganizationUnit() {
    await this.addOrganization.click();
  }

async enterNewOrganizationName(deptName = 'IT'){
    await this.enterOrganizationName.fill(deptName);
}

  async clickEditIconByIndex(index) {
    const targetIcon = this.editIcon.nth(index); // index is zero-based
    await expect(targetIcon, `Edit icon at index ${index} should be visible`).toBeVisible();
    await targetIcon.click();
  }

  async editOrganizationInputField(index, text) {
    await this.inputFields.nth(index).fill(text);
  }

async deleteStructureByIndex() {
    await this.structureDeleteButton.click();
    await this.confirmDeleteButton.click();
    await expect(this.toastMessage).toContainText("Successfully Deleted");
  }

  async verifySuccesMsg(){
    await expect(this.success).toBeVisible();
  }

  async selectUserDropdownItem(itemText) {
    await this.page.locator('.oxd-topbar-body-nav-tab-item').first().click();
    await this.page.getByRole('menuitem', { name: itemText }).click();
  }

  async verifyUpdatingNoteField1() {
    await this.editToggleOnADminOrg.check();
    await this.page.locator('textarea').fill("Hi there");
    await this.saveButton.click();
  }
}

module.exports = { AdminOrganizationPage };
