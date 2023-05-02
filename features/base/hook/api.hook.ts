import type { UserProfile } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { Query } from "@types";
import { ApiService } from "@services/base";
import { Model } from "@models/base";
import { nextTick } from "process";

export function useApi<
  ServiceType extends ApiService<ReturnType, InputType, UpdateType>,
  ReturnType extends Model,
  InputType,
  UpdateType
>(Service: new (user: UserProfile | undefined) => ServiceType, user: UserProfile | undefined) {
  const [item, setItem] = useState<ReturnType | undefined>(undefined);
  const [createdItem, setCreatedItem] = useState<ReturnType | undefined>(undefined);
  const [creatingItem, setCreatingItem] = useState<boolean>(false);
  const [creatingItemError, setCreatingItemError] = useState<Error | undefined>(undefined);
  const [fetchingItem, setFetchingItem] = useState<boolean>(false);
  const [fetchingItemError, setFetchingItemError] = useState<Error | undefined>(undefined);
  const [updatedItem, setUpdatedItem] = useState<ReturnType | undefined>(undefined);
  const [updatingItem, setUpdatingItem] = useState<boolean>(false);
  const [updatingItemError, setUpdatingItemError] = useState<Error | undefined>(undefined);

  const [list, setList] = useState<Array<ReturnType> | undefined>(undefined);
  const [fetchingList, setFetchingList] = useState<boolean>(false);
  const [fetchingListError, setFetchingListError] = useState<Error | undefined>(undefined);

  const create = (input: InputType, appendToList?: boolean) => {
    if (user) {
      setCreatedItem(undefined);
      setCreatingItemError(undefined);
      setCreatingItem(true);
      new Service(user)
        .create(input)
        .then((response) => {
          setCreatingItem(false);
          setList((data: Array<ReturnType> | undefined) =>
            appendToList ? [...(data || []), response] : [response, ...(data || [])]
          );
          nextTick(() => {
            setCreatedItem(response);
          });
        })
        .catch((error) => {
          setCreatingItemError(new Error(error));
          setCreatingItem(false);
        });
    }
  };

  const fetchItem = (id?: string, query?: Query) => {
    if (user) {
      setItem(undefined);
      setFetchingItemError(undefined);
      setFetchingItem(true);
      new Service(user)
        .get(id, query)
        .then((response) => {
          setItem(response);
          setFetchingItem(false);
        })
        .catch((error) => {
          setFetchingItemError(new Error(error));
          setFetchingItem(false);
        });
    }
  };

  const fetchList = (query?: Query) => {
    if (user) {
      setList(undefined);
      setFetchingListError(undefined);
      setFetchingList(true);
      new Service(user)
        .getMany(query)
        .then((response) => {
          setList(response);
          setFetchingList(false);
        })
        .catch((error) => {
          setFetchingListError(new Error(error));
          setFetchingList(false);
        });
    }
  };

  const update = (id: string | undefined, update: UpdateType) => {
    if (user) {
      setUpdatedItem(undefined);
      setUpdatingItemError(undefined);
      setUpdatingItem(true);
      new Service(user)
        .update(id, update)
        .then((response) => {
          setUpdatingItem(false);
          setList((list: Array<ReturnType> | undefined) =>
            list?.map((item) => {
              if (item._id === response._id) {
                return response;
              }
              return item;
            })
          );
          nextTick(() => {
            setUpdatedItem(response);
          });
        })
        .catch((error) => {
          setUpdatingItemError(new Error(error));
          setUpdatingItem(false);
        });
    }
  };

  return {
    item,
    fetchItem,
    fetchingItem,
    fetchingItemError,

    list,
    fetchList,
    fetchingList,
    fetchingListError,

    createdItem,
    create,
    creatingItem,
    creatingItemError,

    updatedItem,
    update,
    updatingItem,
    updatingItemError,
  } as const;
}
