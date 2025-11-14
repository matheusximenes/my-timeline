import { Era, ITimelineEvent } from "@/db/db.model"

export const handleFormValidation = (formData: ITimelineEvent | null) => {
        if(!formData) {
            return true
        }
        const { startEra, endEra, startYear, endYear } = formData || {}

        // Both dates are BCE
        if (startEra === Era.BCE && endEra === Era.BCE) {
            // In BCE, larger numbers are earlier in time
            if (startYear >= endYear) return false
        }

         if (startEra === Era.CE && endEra === Era.CE) {
            if (startYear <= endYear) return false
         }

        // Validate that years are not 0
        if (startYear === 0 || endYear === 0) return true

        return false
    }