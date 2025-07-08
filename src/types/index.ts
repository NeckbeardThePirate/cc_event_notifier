interface UserAttributes {
	accounting_administrator: boolean;
	anniversary: null | string;
	avatar: string;
	birthdate: string;
	can_create_forms: boolean;
	can_email_lists: boolean;
	child: boolean;
	created_at: string;
	demographic_avatar_url: string;
	directory_status: string;
	first_name: string;
	gender: string;
	given_name: null | string;
	grade: null | string;
	graduation_year: null | string;
	inactivated_at: null | string;
	last_name: string;
	login_identifier: null | string;
	medical_notes: null | string;
	membership: null | string;
	middle_name: null | string;
	name: string;
	nickname: null | string;
	passed_background_check: boolean;
	people_permissions: null | string;
	remote_id: null | string;
	resource_permission_flags: Record<'can_access_workflows', boolean>;
	school_type: null | string;
	site_administrator: boolean;
	status: string;
	updated_at: string;
}

export interface UserRelationships {
	primary_campus: Record<'data', null>
	gender: UserGenderRecord
}

export interface UserGenderRecord {
	data: UserGenderData
}

export interface UserGenderData {
	type: string;
	id: string;

}

export interface UserLinks {
	self: string;
	html: string;
}

export interface User {
	type: string;
	id: number;
	attributes: UserAttributes;
	relationships: UserRelationships;
	links: UserLinks;
}

// Assuming response.data is an array of User objects
export interface ApiResponse {
	data: User[];
	links: ApiResponseLinks
	// other response properties...
}

interface ApiResponseLinks {
	prev: string;
	next: string;
	self: string
}
