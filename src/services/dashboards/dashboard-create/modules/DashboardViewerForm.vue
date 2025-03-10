<template>
    <section>
        <p-pane-layout>
            <p-heading heading-type="sub"
                       :title="$t('DASHBOARDS.CREATE.LABEL_VIEWERS')"
            />
            <div class="dashboard-viewers-wrapper">
                <p-radio-group direction="vertical">
                    <div>
                        <p-radio
                            :selected="isPublicViewer"
                            @change="handleSelectViewer(DASHBOARD_VIEWER.PUBLIC)"
                        >
                            {{ $t('DASHBOARDS.CREATE.PUBLIC') }}
                        </p-radio>
                        <p class="viewer-description">
                            {{ $t('DASHBOARDS.CREATE.PUBLIC_DESC') }}
                        </p>
                    </div>
                    <div>
                        <p-radio
                            :selected="!isPublicViewer"
                            @change="handleSelectViewer(DASHBOARD_VIEWER.PRIVATE)"
                        >
                            {{ $t('DASHBOARDS.CREATE.PRIVATE') }}
                        </p-radio>
                        <p class="viewer-description">
                            {{ $t('DASHBOARDS.CREATE.PRIVATE_DESC') }}
                        </p>
                    </div>
                </p-radio-group>
            </div>
        </p-pane-layout>
    </section>
</template>

<script lang="ts">
import type { SetupContext } from 'vue';
import { reactive, toRefs } from 'vue';

import {
    PPaneLayout, PHeading, PRadioGroup, PRadio,
} from '@spaceone/design-system';

import { DASHBOARD_VIEWER } from '@/services/dashboards/config';
import type { DashboardViewer } from '@/services/dashboards/config';

export default {
    name: 'DashboardViewerForm',
    components: {
        PHeading,
        PPaneLayout,
        PRadioGroup,
        PRadio,
    },
    setup(props, { emit }: SetupContext) {
        const state = reactive({
            isPublicViewer: true,
        });

        const handleSelectViewer = (viewerType: DashboardViewer) => {
            state.isPublicViewer = viewerType === DASHBOARD_VIEWER.PUBLIC;
            emit('update:dashboardViewerType', viewerType);
        };

        return {
            ...toRefs(state),
            DASHBOARD_VIEWER,
            handleSelectViewer,
        };
    },
};
</script>

<style lang="postcss" scoped>
.dashboard-viewers-wrapper {
    padding: 0.5rem 1rem 2.5rem;
    .p-radio-group {
        display: grid;
        grid-gap: 0.815rem;
    }
    .viewer-description {
        @apply text-xs text-gray-500;
        font-weight: 400;
        margin: 0.25rem 0 0 1.5rem;
    }
}
</style>
