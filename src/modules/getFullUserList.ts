import { ApiResponse } from '../types/index';

const fs = require('fs');
const dotenv = require('dotenv');

require('dotenv').config();

const appId = process.env.APP_ID;
const devSecret = process.env.PCO_PAT;

const nameList = await JSON.parse(fs.readFileSync('./names.json'));

export default async function getUserList(
	appId: string,
	devSecret: string,
	maxIterations: number,
	nameList: Array<string>
): Promise<boolean> {
	const userHeaders = new Headers();
	userHeaders.set('Authorization', 'Basic ' + btoa(`${appId}:${devSecret}`));

	let userList = [];
	const baseUrl = 'https://api.planningcenteronline.com/people/v2/people';
	let iterator = 0;

	const request = await fetch(baseUrl, {
		method: 'GET',
		headers: userHeaders,
	});

	let response = (await request.json()) as ApiResponse;
	let url = response.links.next;

	for (const item in response.data) {
		if (nameList.includes(response.data[item].attributes.name)) {
			userList.push(response.data[item]);
		}
	}

	while (response.links.next !== undefined && iterator < maxIterations) {
		const request = await fetch(url, {
			method: 'GET',
			headers: userHeaders,
		});

		let response = await request.json();

		iterator++;

		for (const user of response.data) {
			if (nameList.includes(user.attributes.name)) {
				console.log(user);
				userList.push(user);
			}
		}

		if (response.links.next !== undefined) {
			url = response.links.next;
		} else {
			fs.writeFileSync(
				'./userList.json',
				JSON.stringify(userList, null, 4)
			);
			return true;
		}
	}
	return true;
}
