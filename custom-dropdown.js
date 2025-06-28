// custom-dropdown.js
// This module contains the logic for our reusable custom dropdown component using Popper.js

export class CustomDropdown {
    // A static property to track the currently open dropdown across all instances.
    static openDropdown = null;

    constructor(containerId, options = [], onSelectCallback) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            // Silently fail if the container isn't on the page (e.g., on a different tab)
            return;
        }

        this.options = options;
        this.onSelect = onSelectCallback;
        this.isOpen = false;
        this.popperInstance = null;
        this.selectedValue = options.length > 0 ? options[0] : '';
        
        this.render();
    }

    render() {
        const initialValue = this.options.length > 0 ? this.options[0] : 'Select an Option';
        
        // This is the main button that the user sees and clicks on.
        const triggerHTML = `
            <button type="button" class="inline-flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50" data-role="toggle-button">
                <span class="truncate" data-role="value-display">${initialValue}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-2 -mr-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
            </button>
        `;

        // This is the menu that appears when the button is clicked.
        const menuHTML = `
            <div role="menu" class="absolute z-30 mt-2 rounded-md border border-gray-200 bg-white shadow-lg hidden" data-role="menu" style="width: var(--radix-popper-anchor-width);">
                <div class="p-2 max-h-60 overflow-y-auto" data-role="menu-items">
                    <!-- Menu items will be populated here -->
                </div>
            </div>
        `;
        
        this.container.innerHTML = triggerHTML + menuHTML;
        
        this.toggleButton = this.container.querySelector('[data-role="toggle-button"]');
        this.valueDisplay = this.container.querySelector('[data-role="value-display"]');
        this.menu = this.container.querySelector('[data-role="menu"]');
        this.menuItemsContainer = this.container.querySelector('[data-role="menu-items"]');
        
        this.setupPopper();
        this.populate(this.options);
        this.setupEventListeners();
    }
    
    setupPopper() {
        if (window.Popper) {
            this.popperInstance = Popper.createPopper(this.toggleButton, this.menu, {
                placement: 'bottom-start',
                modifiers: [
                    { name: 'offset', options: { offset: [0, 8] } },
                    { name: 'flip', options: { fallbackPlacements: ['top-start'] } },
                    { name: 'preventOverflow', options: { padding: 8 } },
                    { 
                        name: 'sameWidth',
                        enabled: true,
                        fn: ({ state }) => {
                            state.styles.popper.width = `${state.rects.reference.width}px`;
                        },
                        phase: 'beforeWrite',
                        requires: ['computeStyles'],
                    }
                ]
            });
        }
    }

    populate(newOptions) {
        this.options = newOptions;
        this.menuItemsContainer.innerHTML = ''; 

        this.options.forEach(optionText => {
            const item = document.createElement('a');
            item.href = '#';
            item.setAttribute('role', 'menuitem');
            item.dataset.value = optionText;
            item.className = 'block rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 whitespace-nowrap';
            item.textContent = optionText;
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSelect(optionText);
            });
            this.menuItemsContainer.appendChild(item);
        });
        
        this.updateValue(this.options.length > 0 ? this.options[0] : 'No Selection');
    }
    
    _highlightSelectedItem() {
        this.menuItemsContainer.querySelectorAll('a').forEach(item => {
            item.classList.remove('font-semibold', 'bg-gray-100');
        });

        const activeItem = this.menuItemsContainer.querySelector(`[data-value="${this.selectedValue}"]`);
        if (activeItem) {
            activeItem.classList.add('font-semibold', 'bg-gray-100');
        }
    }

    setupEventListeners() {
        this.toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        document.addEventListener('click', (event) => {
            if (CustomDropdown.openDropdown && !CustomDropdown.openDropdown.container.contains(event.target)) {
                CustomDropdown.openDropdown.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        if (this.isOpen) return;

        if (CustomDropdown.openDropdown && CustomDropdown.openDropdown !== this) {
            CustomDropdown.openDropdown.close();
        }

        this.menu.classList.remove('hidden');
        this.menu.setAttribute('data-show', '');
        this.popperInstance.update();
        this.isOpen = true;
        CustomDropdown.openDropdown = this;
    }

    close() {
        if (!this.isOpen) return;
        this.menu.classList.add('hidden');
        this.menu.removeAttribute('data-show');
        this.isOpen = false;
        if (CustomDropdown.openDropdown === this) {
            CustomDropdown.openDropdown = null;
        }
    }

    handleSelect(value) {
        this.updateValue(value);
        this.close();
        if (this.onSelect) {
            this.onSelect(value);
        }
    }

    updateValue(value) {
        this.selectedValue = value;
        this.valueDisplay.textContent = this.selectedValue;
        this._highlightSelectedItem();
    }
    
    getValue() {
        return this.selectedValue;
    }
}
