import { elementHelper } from '../utils/elementHelper.js';

class FilterSidebar {
    get idFilterSidebar() { return $('[data-test="filters"]'); }
    get idSortSelect() { return $('[data-test="sort"]'); }

    filterOption(name) {
        return $(`//label[normalize-space()="${name}"]`);
    }

    async selectFilter(name) {
        await elementHelper.waitAndClick(this.filterOption(name));
    }

    async sortBy(option) {
        await this.idSortSelect.selectByVisibleText(option);
    }
}

export default new FilterSidebar();
