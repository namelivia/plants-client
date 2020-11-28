<template lang="pug">
section
    h1 PLANT LIST
    b-card-group(columns)
        b-card.mb-2(
            v-for='plant in plants' :key='plant.id'
            :title="plant.name"
            :img-src="plant.image_url"
            :img-alt="plant.name"
            img-top
            style="max-width: 20rem;"
        )
            b-card-text
                p.mb-0 Species: {{plant.species}}
                p Days until watering: {{plant.days_until_watering}}
            b-button(variant="primary") Water it
            b-button.ml-2(variant="danger") Delete it
</template>

<script>
    export default {
        data: function () {
            //TODO: This will be empty, not it's just a stub
            return {
                plants: [
                    {
                        'id': 1,
                        'name': 'plant1',
                        'species': 'Black locust',
                        'days_until_watering': 1,
                        'image_url': 'https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-in-outdoor-monstera__0614197_PE686822_S5.JPG'
                    }, {
                        'id': 2,
                        'name': 'plant2',
                        'species': 'Scots pine',
                        'days_until_watering': 5,
                        'image_url': 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/prayer-plant-best-indoor-plants-1582228391.jpg'
                    }, {
                        'id': 3,
                        'name': 'plant3',
                        'species': 'Salvia cistus',
                        'days_until_watering': 8,
                        'image_url': 'https://gearpatrol.com/wp-content/uploads/2019/01/10-Best-Indoor-Plants-Gear-Patrol-umbrella.jpg'
                    }
                ]
            }
        },
        mounted: function() {
            //TODO: This will be the api call 
            /*this.$axios
            .get('endpoint')
            .then(response => console.log(response.data))*/
        }
    }
</script>
