import type {Ref} from "vue";

export async function getGroup(
    studentsDate: Ref<any[]>,
    selectedGroup: Ref<string>,
    groups: Ref<string[]>
) {
    try {
        studentsDate.value = [];
        selectedGroup.value = '';
        const urlGroup = 'http://localhost:8080/api/groups';

        const response = await fetch(urlGroup)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        groups.value = Array.isArray(data) ? data : [];
        console.log("Group data", groups.value);
    } catch (err) {
        console.log(err);
    }
}