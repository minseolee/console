<template>
    <nav class="lnb">
        <div class="header">
            <slot name="header">
                {{ header }}
            </slot>
        </div>
        <p-divider class="divider" />
        <div class="menu-wrapper">
            <router-link v-if="backLink.label"
                         class="back-link"
                         :to="backLink.to"
            >
                <p-i name="ic_chevron-left"
                     width="1rem"
                     height="1rem"
                     color="inherit transparent"
                />
                {{ backLink.label }}
            </router-link>
            <slot />
            <div v-if="topTitle.label"
                 class="top-title"
            >
                <div class="icon-label-wrapper">
                    <p-lazy-img
                        v-if="topTitle.icon"
                        :src="assetUrlConverter(topTitle.icon)"
                        width="1.5rem"
                        height="1.5rem"
                        class="icon"
                    />
                    <span :class="{'icon-label': topTitle.icon}"
                          class="label"
                    >{{ topTitle.label }}</span>
                </div>
                <router-link v-if="topTitle.visibleAddButton"
                             :to="topTitle.addButtonLink"
                >
                    <p-i name="ic_plus"
                         width="1rem"
                         height="1rem"
                         class="add-button"
                    />
                </router-link>
            </div>
            <template v-for="(menuData, idx) in menuSet">
                <div v-if="menuData.type === MENU_ITEM_TYPE.FAVORITE_ONLY"
                     :key="`${idx}-${getUUID()}`"
                     class="favorite-only-wrapper"
                >
                    <span>{{ $t('DASHBOARDS.LNB.ONLY_FAVORITE') }}</span>
                    <p-toggle-button :value="proxyShowFavoriteOnly"
                                     @change-toggle="handleFavoriteToggle"
                    />
                </div>
                <l-n-b-menu-item v-else
                                 :key="`${idx}-${getUUID()}`"
                                 :menu-data="menuData"
                                 :current-path="currentPath"
                                 :depth="Array.isArray(menuData) ? 2 : 1"
                >
                    <template v-for="(_, slot) of $scopedSlots"
                              #[slot]="scope"
                    >
                        <slot :name="slot"
                              v-bind="scope"
                        />
                    </template>
                </l-n-b-menu-item>
            </template>
        </div>
    </nav>
</template>

<script lang="ts">
import type { SetupContext } from 'vue';
import {
    computed, getCurrentInstance, reactive, toRefs,
} from 'vue';
import type { Vue } from 'vue/types/vue';

import {
    PDivider, PI, PLazyImg, PToggleButton,
} from '@spaceone/design-system';

import { getUUID } from '@/lib/component-util/getUUID';
import { assetUrlConverter } from '@/lib/helper/asset-helper';

import { useProxyValue } from '@/common/composables/proxy-state';
import LNBMenuItem from '@/common/modules/navigations/lnb/modules/LNBMenuItem.vue';
import type {
    BackLink, LNBMenu, TopTitle,
} from '@/common/modules/navigations/lnb/type';
import { MENU_ITEM_TYPE } from '@/common/modules/navigations/lnb/type';

export default {
    name: 'LNB',
    components: {
        LNBMenuItem, PDivider, PI, PLazyImg, PToggleButton,
    },
    props: {
        header: {
            type: String,
            default: '',
        },
        backLink: {
            type: Object as () => BackLink,
            default: () => ({}),
        },
        topTitle: {
            type: Object as () => TopTitle,
            default: () => ({}),
        },
        menuSet: {
            type: Array as () => LNBMenu[],
            default: () => [],
        },
        showFavoriteOnly: {
            type: Boolean,
            default: undefined,
        },
    },

    setup(props, { emit }: SetupContext) {
        const vm = getCurrentInstance()?.proxy as Vue;
        const state = reactive({
            currentPath: computed(() => vm.$route.fullPath),
            proxyShowFavoriteOnly: useProxyValue<boolean | undefined>('showFavoriteOnly', props, emit),
        });

        const handleFavoriteToggle = () => {
            state.proxyShowFavoriteOnly = !state.proxyShowFavoriteOnly;
        };

        return {
            ...toRefs(state),
            MENU_ITEM_TYPE,
            assetUrlConverter,
            getUUID,
            handleFavoriteToggle,
        };
    },
};
</script>

<style lang="postcss" scoped>
.lnb {
    .header {
        @apply font-bold;
        padding-left: 1.25rem;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
        font-size: 1rem;
        line-height: 125%;
    }
    .menu-wrapper {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-bottom: 2rem;
    }
    .divider {
        margin-bottom: 1.25rem;
    }
    .back-link {
        @apply flex text-gray-500;
        font-size: 0.75rem;
        line-height: 125%;
        margin-top: 1.25rem;
        height: 1.75rem;
        &:hover {
            @apply text-gray-800 cursor-pointer;
            text-decoration: underline;
        }
    }
    .favorite-only-wrapper {
        @apply flex justify-between items-center text-gray-500;
        font-size: 0.75rem;
        padding: 0 0.5rem;
    }
    .top-title {
        @apply text-gray-800 font-bold flex justify-between items-center;
        font-size: 0.75rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        .icon-label-wrapper {
            @apply flex items-center;
            height: 2rem;
            .icon {
                @apply rounded flex-shrink-0;
                margin-right: 0.375rem;
            }
            .label {
                &.icon-label {
                    font-size: 0.875rem;
                }
            }
        }
        .add-button {
            @apply cursor-pointer;
            height: 2rem;
        }
    }
}
</style>
