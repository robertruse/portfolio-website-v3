// const validators = {
//     templateName: {
//         name: 'Template Name',
//         errorMessage: 'Please use Alphanumeric or (, ,),_,-,,,: characters',
//         validator: {
//             pattern: '^[A-Za-z0-9 :,_()-]+$',
//         },
//     },
//     cwe: {
//         name: 'CWE',
//         errorMessage: 'Please use the following format CWE-id or leave it N/A',
//         validator: {
//             pattern: '^(CWE-[0-9]{1,5}|N/A)$|^$',
//         },
//     },
//     owasp: {
//         name: 'OWASP',
//         errorMessage: 'Please use the following format A# - Owasp Top 10 Valid Cathegory Name or leave it N/A',
//         validator: {
//             pattern: '^(A[0-9]{1,2} - [A-Z].*|N/A)$|^$',
//         },
//     },
// }

document.addEventListener('alpine:init', () => {
    // Directives
    Alpine.directive('tooltip', (el, { expression }, { evaluate }) => {
        tippy(el, { content: evaluate(expression) })
    })

    // Magics
    Alpine.magic('clipboard', (el) => {
        return (subject) => {
            navigator.clipboard.writeText(subject)

            const tooltip = tippy(el, { content: 'Copied to clipboard', trigger: 'manual' })
            tooltip.show()

            setTimeout(() => {
                tooltip.hide()
                setTimeout(() => tooltip.destroy(), 150)
            }, 2000)
        }
    })

    // Components
    Alpine.data('table', () => ({
        sortBy: null,
        sortDirection: 'ascending',
        getFilteredColumns(columns) {
            return columns.filter(Boolean)
        },
        getSortedRows(columns, rows, callback) {
            if (!rows) return []
            if (!this.sortBy) return rows

            const column = columns.find((column) => column.name === this.sortBy)

            if (!column) return
            if (callback) return callback(column, this.sortDirection)

            return rows.slice().sort(column.compare(this.sortDirection))
        },
        handleSort(column) {
            if (this.sortBy !== column) {
                this.sortBy = column
                this.sortDirection = 'ascending'
            } else {
                this.sortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending'
            }
        },
    }))

    Alpine.data('pagination', (props) => ({
        siblings: props?.defaultSiblings ?? 1, // amount on left/right side of current page
        dotsJump: props?.defaultDotsJump ?? 5, // number of pages that are added or subtracted on the '...' button
        getPage(value, currentPage) {
            return {
                type: 'page',
                isCurrent: value === currentPage ? true : false,
                value: value,
            }
        },
        getTotalPages(totalItems, pageSize) {
            const totalPages = Math.ceil(totalItems / pageSize)
            return totalPages > 0 ? totalPages : 1
        },
        getAllPages(totalPages, currentPage) {
            const allPages = []
            for (let i = 1; i <= totalPages; i++) {
                allPages.push(this.getPage(i, currentPage))
            }

            return allPages
        },
        getStartPages(currentPage) {
            const startPages = []
            for (let i = 1; i <= this.siblings * 2 + 3; i++) {
                startPages.push(this.getPage(i, currentPage))
            }

            return startPages
        },
        getEndPages(totalPages, currentPage) {
            const endPages = []
            for (let i = totalPages - (this.siblings * 2 + 2); i <= totalPages; i++) {
                endPages.push(this.getPage(i, currentPage))
            }

            return endPages
        },
        getMiddlePages(currentPage) {
            const middlePages = []
            for (let i = currentPage - this.siblings; i <= currentPage + this.siblings; i++) {
                middlePages.push(this.getPage(i, currentPage))
            }

            return middlePages
        },
        getBoundaryLeft(currentPage) {
            const dotsJump = {
                type: 'dotsJump',
                direction: 'left',
                value: currentPage - this.dotsJump >= 1 ? currentPage - this.dotsJump : 1,
            }

            return [this.getPage(1, currentPage), dotsJump]
        },
        getBoundaryRight(totalPages, currentPage) {
            const dotsJump = {
                type: 'dotsJump',
                direction: 'right',
                value: currentPage + this.dotsJump <= totalPages ? currentPage + this.dotsJump : totalPages,
            }

            return [dotsJump, this.getPage(totalPages, currentPage)]
        },
        getPages(currentPage, totalPages) {
            // total pages is 1 or 0 so show 1 page
            if (totalPages <= 1) {
                return [this.getPage(1, currentPage)]
            }

            // total pages less than max so show all pages
            if (totalPages <= this.siblings * 2 + 5) {
                return this.getAllPages(totalPages, currentPage)
            }

            // current page near the start
            if (currentPage <= this.siblings + 3) {
                return [...this.getStartPages(currentPage), ...this.getBoundaryRight(totalPages, currentPage)]
            }

            // current page near the end
            if (currentPage + (this.siblings + 2) >= totalPages) {
                return [...this.getBoundaryLeft(currentPage), ...this.getEndPages(totalPages, currentPage)]
            }

            // current page somewhere in the middle
            return [
                ...this.getBoundaryLeft(currentPage),
                ...this.getMiddlePages(currentPage),
                ...this.getBoundaryRight(totalPages, currentPage),
            ]
        },
    }))

    Alpine.data('disclosure', (props) => ({
        open: props?.defaultOpen ?? false,
        toggle() {
            this.open = !this.open
        },
        $open() {
            this.open = true
        },
        $close() {
            this.open = false
        },
    }))

    Alpine.data('popover', (props) => ({
        open: props?.defaultOpen ?? false,
        toggle() {
            this.open = !this.open
        },
        close(focusAfter) {
            if (!this.open) return

            this.open = false
            focusAfter && focusAfter.focus()
        },
    }))

    Alpine.data('modal', (props) => ({
        open: props?.defaultOpen ?? false,
        toggle() {
            this.open = !this.open
        },
    }))

    // Calendar
    Alpine.data('calendar', (props) => ({
        value: props?.defaultValue ?? '',
        mode: props?.defaultMode ?? 'single',
        appendTo: props?.defaultAppendTo ?? undefined,
        getEl(props) {
            return props?.defaultEl ?? this.$el
        },
        init() {
            let picker = flatpickr(this.getEl(props), {
                locale: { rangeSeparator: ' - ' },
                appendTo: this.appendTo,
                mode: this.mode,
                dateFormat: 'M d, Y',
                defaultDate: this.value,
                onChange: (date, dateString) => {
                    this.value = dateString.split(' - ')
                },
            })
            this.$watch('value', (value) => {
                picker.setDate(value)
            })
        },
    }))
})
