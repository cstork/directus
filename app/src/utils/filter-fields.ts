import { Field } from '@directus/shared/types';
import { Ref, computed } from 'vue';

export function filterFields<T extends string>(fields: Ref<Field[]>, filters: Record<T, (field: Field) => boolean>) {
	const fieldGroups = computed(() => {
		const acc = {} as Record<Extract<T, string>, Field[]>;
		for (const name in filters) {
			acc[name] = [];
		}

		return fields.value.reduce((acc, field) => {
			for (const name in filters) {
				if (filters[name](field) === false) continue;
				acc[name].push(field);
			}
			return acc;
		}, acc);
	});

	return { fieldGroups };
}
