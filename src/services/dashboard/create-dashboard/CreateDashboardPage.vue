<template>
    <div class="create-dashboard-page">
        <!--        song-lang-->
        <p-page-title
            child
            title="Create New Dashboard"
            @goBack="$router.go(-1)"
        />
        <p-pane-layout class="dashboard-scope">
            <p-panel-top title="Dashboard Scope" />
            <p-radio-group class="dashboard-radio-group"
                           direction="vertical"
            >
                <p-radio>Entire Workspaces</p-radio>
                <p-radio>Single Project</p-radio>
            </p-radio-group>
        </p-pane-layout>
    </div>
</template>

<script lang="ts">
import {
    PPageTitle, PPaneLayout, PPanelTop, PRadio, PRadioGroup,
} from '@spaceone/design-system';

export default {
    name: 'CreateDashboardPage',
    components: {
        PRadioGroup,
        PRadio,
        PPanelTop,
        PPageTitle,
        PPaneLayout,
    },
};
</script>

<style lang="postcss" scoped>
.dashboard-radio-group {
    margin: 0.5rem 1rem 2.25rem;
    display: grid;
    grid-gap: 0.85rem;
}
</style>
