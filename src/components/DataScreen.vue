<template>
    <h2>Data, {{user}}</h2>
</template>

<script>

export default {
    name: 'DataScreen',
    props: {
        user: Object
    },
    setup(props) {
        const user = props.user;
        return {
            user
        }
    },
}
</script>
