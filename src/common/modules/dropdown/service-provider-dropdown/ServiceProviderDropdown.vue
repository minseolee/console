<template>
    <p-select-dropdown class="service-provider-dropdown"
                       :selected="cloudServicePageState.selectedProvider"
                       :items="contextMenuItems"
                       @select="handleSelect"
    >
        <span v-if="selectedProviderItem"
              class="text"
        >
            <p-lazy-img width="1rem"
                        height="1rem"
                        :src="selectedProviderItem.icon"
                        class="mr-1"
            /><span>{{ selectedProviderItem.name }}</span>
        </span>
        <span v-else-if="hasAll"
              class="text"
        >
            <p-lazy-img error-icon="ic_cloud-filled"
                        width="1rem"
                        height="1rem"
                        class="mr-1"
            /><span>All</span>
        </span>
        <template #menu-item--format="{ item }">
            <div class="content-menu-item">
                <p-lazy-img width="1rem"
                            height="1rem"
                            error-icon="ic_cloud-filled"
                            :src="item.icon"
                            class="mr-1"
                /><span>{{ item.label }}</span>
            </div>
        </template>
    </p-select-dropdown>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from 'vue';

import { PSelectDropdown, PLazyImg } from '@spaceone/design-system';

import { store } from '@/store';
import { i18n } from '@/translations';

import type { ProviderReferenceMap } from '@/store/modules/reference/provider/type';

import { useCloudServicePageStore } from '@/services/asset-inventory/store/cloud-service-page-store';


export default {
    name: 'ServiceProviderDropdown',
    components: {
        PSelectDropdown,
        PLazyImg,
    },
    model: {
        prop: 'selectedProvider',
        event: 'update:selectedProvider',
    },
    props: {
        hasAll: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const cloudServicePageStore = useCloudServicePageStore();
        const cloudServicePageState = cloudServicePageStore.state;

        const state = reactive({
            providers: computed<ProviderReferenceMap>(() => store.getters['reference/providerItems']),
            selectedProviderItem: computed(() => state.providers[cloudServicePageState.selectedProvider]),
            contextMenuItems: computed(() => [
                { type: 'header', name: 'serviceProvider', label: i18n.t('INVENTORY.CLOUD_SERVICE.MAIN.SERVICE_PROVIDER') },
                ...(props.hasAll ? [{ name: 'all', label: 'All', icon: undefined }] : []),
                ...Object.keys(state.providers).map((k) => ({
                    label: state.providers[k].name,
                    name: k,
                    icon: state.providers[k]?.icon,
                })),
            ]),
        });
        const handleSelect = (provider: string) => {
            cloudServicePageStore.setSelectedProvider(provider);
        };
        return {
            ...toRefs(state),
            cloudServicePageState,
            handleSelect,
        };
    },
};
</script>

<style lang="postcss" scoped>
/* custom design-system component - p-select-dropdown */
.service-provider-dropdown {
    :deep(.dropdown-button) {
        @apply rounded-2xl border-gray-200 bg-gray-100;
        width: unset;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
        .text {
            @apply flex items-center;
        }
        &:not(.invalid):not(.disabled):not(.read-only).active.default {
            @apply bg-gray-100 border-gray-200;
        }
        &:not(.invalid):not(.disabled):not(.active):not(.read-only).default {
            &:not(.active):not(.disabled):hover {
                @apply bg-gray-100 border-gray-200;
            }
        }
    }
    :deep(.p-context-menu) {
        margin-top: 0.125rem;
        .context-header {
            margin-top: 0.5625rem;
        }
        &.left {
            left: 0.5rem;
        }
    }
}
.content-menu-item {
    @apply flex items-center flex-wrap gap-1;
    width: 8.25rem;
}
</style>
