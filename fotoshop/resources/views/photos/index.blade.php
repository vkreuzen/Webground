<x-app-layout>
    <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8 gap-4">
        <form method="POST" action="{{ route('photos.store') }}">
            @csrf
            <textarea
                name="description"
                placeholder="{{ __('Image description') }}"
                class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >{{ old('decsription') }}</textarea>
            <textarea
                name="date"
                placeholder="{{ __('Image date') }}"
                class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >{{ old('date') }}</textarea>
            <textarea
                name="filename"
                placeholder="{{ __('Image filename') }}"
                class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            >{{ old('filename') }}</textarea>
            {{-- @csrf --}}
            <input type="file" name="file_upload">
            <x-input-error :messages="$errors->get('message')" class="mt-2" />
            <x-primary-button class="mt-4">{{ __('Store File') }}</x-primary-button>
        </form>



        <div class="mt-6 shadow-sm rounded-lg divide-y">
            @foreach ($photos as $photo)
            @if ($photo->user->is(auth()->user()))
                <div class="mt-4 bg-white p-6 flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div class="flex-1">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-gray-800">{{ $photo->user->name }}</span>
                                <small class="ml-2 text-sm text-gray-600">{{ $photo->created_at->format('j M Y, g:i a') }}</small>
                                @unless ($photo->created_at->eq($photo->updated_at))
                                    <small class="text-sm text-gray-600"> &middot; {{ __('edited') }}</small>
                                @endunless
                            </div>
                            @if ($photo->user->is(auth()->user()))
                                <x-dropdown>
                                    <x-slot name="trigger">
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                    </x-slot>
                                    <x-slot name="content">
                                        <x-dropdown-link :href="route('photos.edit', $photo)">
                                            {{ __('Edit') }}
                                        </x-dropdown-link>
                                        <form method="POST" action="{{ route('photos.destroy', $photo) }}">
                                            @csrf
                                            @method('delete')
                                            <x-dropdown-link :href="route('photos.destroy', $photo)" onclick="event.preventDefault(); this.closest('form').submit();">
                                                {{ __('Remove from shop') }}
                                            </x-dropdown-link>
                                        </form>
                                    </x-slot>
                                </x-dropdown>
                            @endif
                        </div>
                        <img src={{"storage/".$photo->filename}} >
                        <p class="mt-4 text-lg text-gray-900">{{$photo->description }}</p>
                    </div>
                </div>
                @endif
            @endforeach
        </div>
    </div>
</x-app-layout>

