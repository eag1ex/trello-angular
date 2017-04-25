module app.data {
    'use strict';

    interface IPeople {
        id: number;
        firstName: string;
        lastName: string;
        age: number;
        location: string;
    }

    export class MockData {
        /* @ngInject */
        constructor() {

        }

        data() {

            return {
                menuItems: this.menuItems(),
                orders: this.orders(),
                loginDetails: this.loginDetails()
            }
        }

        menuItems() {
            var menu: Array<any> = [
                { id: 1, name: 'Dashboard', cssClass: 'icon controls-white' },
                { id: 2, name: 'Orders', ref: 'orders', cssClass: 'icon shopping-cart-white' },
                { id: 3, name: 'Companies', cssClass: 'icon factory-white' },
                { id: 4, name: 'Products', cssClass: 'icon box-white' },
                { id: 5, name: 'Documents', cssClass: 'icon document-white' },
                { id: 6, name: 'Pricing', cssClass: 'icon pricing-label-white' },
                { id: 7, name: 'Brands', cssClass: 'icon shapes-white' },
                { id: 8, name: 'Settings', cssClass: 'icon gear-white' },
                { id: 9, name: 'Reports', cssClass: 'icon chart-white' },
                { id: 10, name: 'Account Users', cssClass: 'icon people-white' },
            ]
            return menu;
        }
        orders() {
            var orders: Array<any> = [

                {
                    id: 1,
                    client: [{
                        name: 'CPF Saraburi',
                        address: 'Highway 2 KaengKhoi Saraburi Thailand',
                        phone: '+66 12332366555'
                    }],
                    purchase: [
                        {
                            id: 1,
                            order: [
                                { sku: 'TN SO 000051' },
                                { desc: "Magnetic Contactor -9A (5.5kW\/7.5 HP)\/ control voltage 230 Vac" },
                                { brand: "Shneider Electric" },
                                { price: 'THB 880' },
                                { dissc: '30%' },
                                { netPrice: "THB 650" },
                                { qty: '16' },
                                { total: "THB 50,079.8823" }
                            ]
                        }

                    ],

                    remarks: ["Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    ]
                }

            ];
            return orders;
        }

        loginDetails() {
            var login: Array<any> = [
                { pre: 'Hello', name: 'Somchai', company: 'Twin Types Corporation' }
            ];
            return login;
        }
    }

    angular
        .module('app.data.mockData', []);

    angular
        .module('app.data.mockData')
        .constant('mockData', new MockData())
}