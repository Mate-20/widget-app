import React from 'react'
import { Button, CalendarCell, CalendarGrid, DateInput, DateRangePicker, DateSegment, Dialog, Group, Heading, Label, Popover, RangeCalendar } from 'react-aria-components';
import styles from './rangepicker.style.module.css'

const RangePicker = () => {
    return (
        <DateRangePicker className={styles.reactAriaDateRangePicker}>
            <Label></Label>
            <Group className={styles.reactAriaGroup}>
                <DateInput className={styles.reactAriaDateInput} slot="start">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <span aria-hidden="true">–</span>
                <DateInput className={styles.reactAriaDateInput} slot="end">
                    {(segment) => <DateSegment segment={segment} />}
                </DateInput>
                <Button className={styles.reactAriaButton}>▼</Button>
            </Group>
            <Popover className={styles.reactAriaPopover}>
                <Dialog>
                    <RangeCalendar className={styles.reactAriaRangeCalendar}>
                        <header>
                            <Button className={styles.reactAriaButton} slot="previous">◀</Button>
                            <Heading className={styles.reactAriaHeading} />
                            <Button className={styles.reactAriaButton} slot="next">▶</Button>
                        </header>
                        <CalendarGrid>
                            {(date) => <CalendarCell date={date} className={styles.reactAriaCalendarCell}/>}
                        </CalendarGrid>
                    </RangeCalendar>
                </Dialog>
            </Popover>
        </DateRangePicker>
    )
}

export default RangePicker