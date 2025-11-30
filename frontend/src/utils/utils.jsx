export function getPriority(score) {
    if (score >= 120)
        return { color: "bg-red-100 text-red-600", label: "High" };
    if (score >= 80)
        return { color: "bg-yellow-100 text-yellow-700", label: "Medium" };

    return { color: "bg-green-100 text-green-700", label: "Low" };
}