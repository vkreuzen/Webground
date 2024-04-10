<x-app-layout>
    <div class="max-w-100 mx-auto p-4 sm:p-6 lg:p-8 gap-4">
        <div class="mt-6 shadow-sm rounded-lg divide-y flex flex-row flex-wrap justify-center">
            @foreach ($photos as $photo)
                <div class="max-w-96 mt-4 bg-white p-6 flex space-x-2 mx-4">
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
                        <div class="max-h-80"><img class="object-contain h-80" src={{$photo->filename}} ></div>
                        <p class="mt-4 text-lg text-gray-900">{{$photo->description}}</p>
                        <p class="mt-4 text-lg text-gray-900">op datum: {{$photo->date}}</p> {{-- ->format('j M Y, g:i a') --}}
                        <p class="mt-4 text-lg text-gray-900">Te koop voor: €{{$photo->price }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</x-app-layout>

